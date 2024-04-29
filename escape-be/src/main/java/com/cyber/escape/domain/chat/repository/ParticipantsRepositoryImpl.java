package com.cyber.escape.domain.chat.repository;

import com.cyber.escape.domain.chat.entity.ChatRoom;
import com.cyber.escape.domain.chat.entity.QChatRoom;
import com.cyber.escape.domain.chat.entity.QParticipants;
import com.cyber.escape.domain.user.entity.QUser;
import com.cyber.escape.global.exception.ChatException;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Slf4j
public class ParticipantsRepositoryImpl {

    private final JPAQueryFactory jpaQueryFactory;

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
}
