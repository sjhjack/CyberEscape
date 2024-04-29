package com.cyber.escape.domain.chat.repository;

import com.cyber.escape.domain.chat.entity.ChatRoom;
import com.cyber.escape.domain.chat.entity.QChatRoom;
import com.cyber.escape.domain.chat.entity.QParticipants;
import com.cyber.escape.domain.user.entity.QUser;
import com.cyber.escape.global.exception.ChatException;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

@Repository
@Slf4j
public class ParticipantsRepositoryImpl {

    private final JPAQueryFactory jpaQueryFactory;
    //private final EntityManager entityManager;

    public ParticipantsRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    // 1대1 채팅
    public ChatRoom findRoomInfoBelongto(String myUuid, String friendUuid) throws ChatException {

        QParticipants participants = QParticipants.participants;
        QChatRoom chatRoom = QChatRoom.chatRoom;
        QUser user = QUser.user;

        //log.info("방장 uuid : {}, 친구 uuid : {}", myUuid, friendUuid);

        // 내가 참여한 채팅방
        List<Long> myRooms = jpaQueryFactory
                .select(participants.chatRoom.id)
                .from(participants)
                .where(participants.participant.uuid.eq(myUuid))
                .fetch();

        if(myRooms.isEmpty())
            return null;

        return jpaQueryFactory
                        .selectFrom(chatRoom)
                        .where(chatRoom.id.in(myRooms)
                                .and(JPAExpressions
                                    .selectOne()
                                    .from(participants)
                                    .where(participants.chatRoom.id.eq(chatRoom.id)
                                            .and(participants.participant.uuid.eq(friendUuid)))
                                    .exists()
                                ))
                        .fetchOne();

    }

    @Transactional
    public void exitRoom(String roomUuid, String exitUuid){

        QParticipants participants = QParticipants.participants;
        QChatRoom chatRoom = QChatRoom.chatRoom;

        // 채팅방에서 현재 남아있는 유저가 몇 명인지를 판단한다.
//        Long remainUserCount =
//                jpaQueryFactory
//                .select(participants.count())
//                        .where(participants.chatRoom.uuid.eq(roomUuid)
//                                .and(participants.deleteFlag.eq(false)))
//                        .fetchOne();

        // 채팅방에서 사용자를 삭제한다.
        //if(remainUserCount <= 1){
            jpaQueryFactory
                    .update(participants)
                    .set(participants.deleteFlag, true)
                    .where(participants.chatRoom.uuid.eq(roomUuid)
                            .and(participants.participant.uuid.eq(exitUuid)))
                    .execute();
        //}

    }
}
