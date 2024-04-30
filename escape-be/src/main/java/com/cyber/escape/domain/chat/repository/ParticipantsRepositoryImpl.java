package com.cyber.escape.domain.chat.repository;

import com.cyber.escape.domain.chat.dto.ChatRoomDto;
import com.cyber.escape.domain.chat.dto.ParticipantDto;
import com.cyber.escape.domain.chat.dto.QParticipantDto_ParticipantsDto;
import com.cyber.escape.domain.chat.entity.ChatRoom;
import com.cyber.escape.domain.chat.entity.Participants;
import com.cyber.escape.domain.chat.entity.QChatRoom;
import com.cyber.escape.domain.chat.entity.QParticipants;
import com.cyber.escape.domain.user.entity.QUser;
import com.cyber.escape.global.exception.ChatException;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


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

        ChatRoom room = jpaQueryFactory
                        .selectFrom(chatRoom)
                        .where(chatRoom.id.in(myRooms)
                                .and(JPAExpressions
                                    .selectOne()
                                    .from(participants)
                                    .where(participants.chatRoom.id.eq(chatRoom.id)
                                            .and(participants.participant.uuid.eq(friendUuid))
                                            .and(participants.deleteFlag.eq(false)))
                                    .exists()
                                ))
                        .fetchOne();

        Long roomId = room.getId();
        
        // 만일 나갔다가 다시 들어온거면 deleteFlag 업데이트 해야함
        jpaQueryFactory
                .update(participants)
                .set(participants.deleteFlag, false)
                .where(participants.chatRoom.id.eq(roomId)
                        .and(participants.participant.uuid.eq(myUuid)))
                .execute();

        return room;
    }

    @Transactional
    public void exitRoom(String roomUuid, String exitUuid){

        QParticipants participants = QParticipants.participants;
        QChatRoom chatRoom = QChatRoom.chatRoom;

        // 채팅방에서 현재 남아있는 유저가 몇 명인지를 판단한다.
        long remainUserCount =
                jpaQueryFactory
                .selectFrom(participants)
                        .join(chatRoom).on(chatRoom.uuid.eq(roomUuid))
                        .where(participants.deleteFlag.eq(false))
                        .fetch().stream().count();

        log.info("Active : {}", remainUserCount);

        // 한 명 남았는데, 한 명도 나가려고 한다면
        if(remainUserCount <= 1){
            jpaQueryFactory
                    .delete(chatRoom)
                    .where(chatRoom.uuid.eq(roomUuid))
                    .execute();
        }
        else{
            // 채팅방에서 사용자의 상태를 변경한다.
            jpaQueryFactory
                    .update(participants)
                    .set(participants.deleteFlag, true)
                    .where(participants.chatRoom.uuid.eq(roomUuid)
                            .and(participants.participant.uuid.eq(exitUuid)))
                    .execute();
        }
    }

    public List<ChatRoomDto.MyChatListDto> getMyChatList(String userUuid){
        QParticipants participants = QParticipants.participants;
        QChatRoom chatRoom = QChatRoom.chatRoom;
        QUser user = QUser.user;

        // 사용자가 속한 모든 채팅방 ID 조회
        List<Long> chatRoomIds = jpaQueryFactory
                .select(participants.chatRoom.id)
                .from(participants)
                .where(participants.participant.uuid.eq(userUuid)
                        .and(participants.deleteFlag.eq(false)))
                .distinct()
                .fetch();

        // 각 채팅방과 참가자 정보 조회
        return chatRoomIds.stream().map(chatRoomId -> {
            List<ParticipantDto.ParticipantsDto> participantList = jpaQueryFactory
                    .select(new QParticipantDto_ParticipantsDto(participants.participant.uuid, participants.participant.nickname))
                    .from(participants)
                    .join(participants.participant, user)
                    .where(participants.chatRoom.id.eq(chatRoomId)
                            .and(participants.deleteFlag.eq(false)))
                    .fetch();
            
            // chatRoom 의 uuid를 불러옴
            String chatRoomUuid = jpaQueryFactory
                    .select(chatRoom.uuid)
                    .from(chatRoom)
                    .where(chatRoom.id.eq(chatRoomId))
                    .fetchOne();

            return new ChatRoomDto.MyChatListDto(chatRoomUuid, participantList);
        }).collect(Collectors.toList());
    }

    public Optional<Participants> existsByUserUuidAndChatRoomUuid(String userUuid, String chatRoomUuid){

        QParticipants participants = QParticipants.participants;
        QChatRoom chatRoom = QChatRoom.chatRoom;

        return Optional.ofNullable(
                jpaQueryFactory
                .selectFrom(participants)
                .join(chatRoom).on(participants.chatRoom.id.eq(chatRoom.id))
                .where(chatRoom.uuid.eq(chatRoomUuid)
                        .and(participants.participant.uuid.eq(userUuid))
                        .and(participants.deleteFlag.eq(false)))
                .fetchOne());

    }


}
