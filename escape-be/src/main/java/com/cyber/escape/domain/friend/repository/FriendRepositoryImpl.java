package com.cyber.escape.domain.friend.repository;

import com.cyber.escape.domain.friend.dto.FriendDto;
import com.cyber.escape.domain.friend.dto.QFriendDto_FriendListResponse;
import com.cyber.escape.domain.friend.entity.Friend;
import com.cyber.escape.domain.friend.entity.QFriend;
import com.cyber.escape.domain.user.entity.QUser;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FriendRepositoryImpl {

    private final JPAQueryFactory jpaQueryFactory;

    public FriendRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public List<FriendDto.FriendListResponse> findFriendList(Long senderId){

        QFriend friend = QFriend.friend;
        QFriend other = QFriend.friend;


        // 더미데이터 잘못 넣었네
        return jpaQueryFactory
                .select(new QFriendDto_FriendListResponse(friend.toUser.uuid, friend.toUser.nickname))
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
}
