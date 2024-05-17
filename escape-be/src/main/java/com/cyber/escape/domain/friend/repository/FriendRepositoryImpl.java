package com.cyber.escape.domain.friend.repository;

import com.cyber.escape.domain.friend.dto.FriendDto;
import com.cyber.escape.domain.friend.dto.QFriendDto_FriendListResponse;
import com.cyber.escape.domain.friend.entity.Friend;
import com.cyber.escape.domain.friend.entity.QFriend;
import com.cyber.escape.domain.friend.entity.QFriendDeleteHistory;
import com.cyber.escape.domain.user.entity.QUser;
import com.cyber.escape.domain.user.entity.User;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Slf4j
public class FriendRepositoryImpl {

    private final JPAQueryFactory jpaQueryFactory;
    private final EntityManager entityManager;

    public FriendRepositoryImpl(JPAQueryFactory jpaQueryFactory, EntityManager entityManager) {
        this.jpaQueryFactory = jpaQueryFactory;
        this.entityManager = entityManager;
    }

    public List<FriendDto.FriendListResponse> findFriendList(Long senderId){

        QFriend friend = QFriend.friend;
        QFriend other = QFriend.friend;

        List<Tuple> list = jpaQueryFactory
                .select(friend.id, friend.toUser.uuid, friend.toUser.nickname)
                .from(friend)
                .where(friend.fromUser.id.eq(senderId)
                        .and(
                                // 서브쿼리: personA를 receiver로 가지고 있는 모든 sender를 찾습니다.
                                friend.toUser.in(
                                        JPAExpressions
                                                .select(other.fromUser)
                                                .from(other)
                                                .where(other.toUser.id.eq(senderId))
                                )
                        )
                )
                .fetch();

        log.info("================== friend information check");
        for(Tuple l : list) {
            log.info("id : {} , user uuid : {}, nickname : {}", l.get(0, Long.class), l.get(1, String.class), l.get(2, String.class));
        }

        // 더미데이터 잘못 넣었네
        return jpaQueryFactory
                .select(new QFriendDto_FriendListResponse(friend.toUser.uuid, friend.toUser.nickname, friend.toUser.profileUrl))
                .from(friend)
                .where(friend.fromUser.id.eq(senderId)
                        .and(
                                // 서브쿼리: personA를 receiver로 가지고 있는 모든 sender를 찾습니다.
                                friend.toUser.in(
                                        JPAExpressions
                                                .select(other.fromUser)
                                                .from(other)
                                                .where(other.toUser.id.eq(senderId))
                                )
                        )
                )
                .fetch();
    }

    @Transactional
    public void removeFriendAndInsertLogHistory(Long currentUserId, Long friendId){

        QFriendDeleteHistory deleteHistory = QFriendDeleteHistory.friendDeleteHistory;
        QFriend friend = QFriend.friend;

        User sender = entityManager.find(User.class, currentUserId);
        User receiver = entityManager.find(User.class, friendId);

        try {
            // 친구 리스트에서 삭제
            log.info("Attempting to delete friend relationship between {} and {}", currentUserId, friendId);
            long deletedCount = jpaQueryFactory
                    .delete(friend)
                    .where(
                            friend.fromUser.id.eq(currentUserId).and(friend.toUser.id.eq(friendId))
                                    .or(friend.fromUser.id.eq(friendId).and(friend.toUser.id.eq(currentUserId)))
                    )
                    .execute();
            log.info("Deleted {} friend relationships", deletedCount);

            // 친구 삭제 히스토리에 저장
            log.info("Logging delete history for sender {} and receiver {}", sender, receiver);

            entityManager.createNativeQuery("INSERT INTO friend_delete_history (from_user_id, to_user_id) VALUES (:sender, :receiver)")
                    .setParameter("sender", currentUserId)
                    .setParameter("receiver", friendId)
                    .executeUpdate();

            log.info("Successfully logged delete history.");
        } catch (Exception e) {
            log.error("Error during removeFriendAndLogHistory operation: {}", e.getMessage(), e);
            throw e; // 다시 예외를 throw하여 호출자에게 전파
        }
    }
}
