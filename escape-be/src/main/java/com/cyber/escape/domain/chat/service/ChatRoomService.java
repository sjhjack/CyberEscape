package com.cyber.escape.domain.chat.service;

import com.cyber.escape.domain.chat.repository.ParticipantsRepository;
import com.cyber.escape.domain.chat.repository.ParticipantsRepositoryImpl;
import com.cyber.escape.domain.chat.entity.ChatRoom;
import com.cyber.escape.domain.chat.entity.Participants;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;
import com.cyber.escape.domain.user.util.UserUtil;
import com.cyber.escape.global.exception.ChatException;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.UserException;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.cyber.escape.domain.chat.repository.ChatRoomRepository;
import com.cyber.escape.domain.chat.dto.ChatRoomDto;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class ChatRoomService {
    private final ConcurrentHashMap<String, Set<String>> roomSessionMap = new ConcurrentHashMap<>();
    private final ChatRoomRepository chatRoomRepository;
    private final ParticipantsRepository participantsRepository;
    private final ParticipantsRepositoryImpl participantsRepositoryImpl;
    private final UserRepository userRepository;
    private final UserUtil userUtil;

    public ChatRoomService(ChatRoomRepository chatRoomRepository, ParticipantsRepository participantsRepository, ParticipantsRepositoryImpl participantsRepositoryImpl, UserRepository userRepository, UserUtil userUtil) {
        this.chatRoomRepository = chatRoomRepository;
        this.participantsRepository = participantsRepository;
        this.participantsRepositoryImpl = participantsRepositoryImpl;
        this.userRepository = userRepository;
        this.userUtil = userUtil;
    }

    @Transactional
    public ChatRoomDto.CreateChatRoomResDto createChatRoom(ChatRoomDto.CreateChatRoomReqDto chatroomInfo)  throws ChatException{
            String userUuid = userUtil.getLoginUserUuid();
            String friendUuid = chatroomInfo.getUserUuid();

            log.info("현재 들어온 user의 uuid : {}", friendUuid);

            List<String> uuidList = new ArrayList<>(Arrays.asList(userUuid, friendUuid));

            List<User> currentUsers = userRepository.findByUuids(uuidList).orElseThrow(
                    () -> new UserException(ExceptionCodeSet.USER_NOT_FOUND));

            User createdRoomUser = currentUsers.get(0);
            User friendUser = currentUsers.get(1);

            // DB에서 현재 user들이 채팅방을 가지고 있는지를 찾는다.
            ChatRoom existChatRoom = participantsRepositoryImpl.findRoomInfoBelongto(createdRoomUser.getUuid(), friendUser.getUuid());

            // 채팅방이 만들어져 있으면 똑같은 걸 준다.
            if(existChatRoom != null) {
                log.info("chatRoom 정보 {}", existChatRoom.toString());
                return ChatRoomDto.CreateChatRoomResDto
                        .builder()
                        .chatRoomUuid(existChatRoom.getUuid())
                        .build();
            }

            // 처음 시작하는 채팅방이면 만든다.
            ChatRoom chatRoom = ChatRoom
                                .builder()
                                .title(chatroomInfo.getTitle())
                                // 방장 정보 저장
                                .user(userRepository.findUserByUuid(userUuid).get())
                                .build();

            // 채팅방 insert
            ChatRoom makedRoom = chatRoomRepository.save(chatRoom);

            // 참가자 정보 insert
            participantsRepository.save(Participants.builder()
                                    .chatRoom(makedRoom)
                                    .participant(createdRoomUser)
                                    .updatedUser(createdRoomUser)
                                    .build());

            participantsRepository.save(Participants.builder()
                    .chatRoom(makedRoom)
                    .participant(friendUser)
                    .updatedUser(createdRoomUser).build());            // 현재 채팅방에 속해있는 유저의 닉네임을 저장한다.

            //joinRoom(makedRoom.getUuid(), createdRoomUser.getNickname());
            //joinRoom(makedRoom.getUuid(), friendRoomUser.getNickname());

            return ChatRoomDto.CreateChatRoomResDto
                            .builder()
                            .chatRoomUuid(makedRoom.getUuid())
                            .build();
    }

    public String exitRoom(ChatRoomDto.ExitChatRoomReqDto req) throws ChatException{
        // 여기서 나가려는 유저가 진짜 채팅방에 있는 유저인지를 확인
        participantsRepositoryImpl.existsByUserUuidAndChatRoomUuid(req.getExitUserUuid(), req.getChatRoomUuid())
                        .orElseThrow(() -> new ChatException(ExceptionCodeSet.BAD_REQUEST));

        participantsRepositoryImpl.exitRoom(req.getChatRoomUuid(), req.getExitUserUuid());
        return "";
    }

    public List<ChatRoomDto.MyChatListDto> getMyChatList(){
        String userUuid = userUtil.getLoginUserUuid();
        return participantsRepositoryImpl.getMyChatList(userUuid);
    }

    public void joinRoom(String roomUuid, String userNickname) {
        // map에 사용자 userUUid를 집어넣는다.
        roomSessionMap.computeIfAbsent(roomUuid, k -> new HashSet<>())
                .add(userNickname);
    }


    @Transactional
    public void leaveRoom(String roomUuid, String sessionId) {
        // db에서 또 지워야 하는데요...

        Set<String> sessions = roomSessionMap.get(roomUuid);
        if (sessions != null) {
            sessions.remove(sessionId);
            if (sessions.isEmpty()) {
                roomSessionMap.remove(roomUuid);
            }
        }
    }

//    public Set<String> getUsersInRoom(String roomId) {
//        return roomSessionMap.getOrDefault(roomId, new HashSet<>());
//    }
//
//    public boolean isUserInRoom(String roomUuId, String sessionId) {
//        Set<String> sessions = roomSessionMap.get(roomUuId);
//        return sessions != null && sessions.contains(sessionId);
//    }
}