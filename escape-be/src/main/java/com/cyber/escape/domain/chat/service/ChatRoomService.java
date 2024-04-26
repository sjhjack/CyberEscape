package com.cyber.escape.domain.chat.service;

import com.cyber.escape.domain.chat.entity.ChatRoom;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;
import com.cyber.escape.domain.user.util.UserUtil;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.UserException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import com.cyber.escape.domain.chat.Repository.ChatRoomRepository;
import com.cyber.escape.domain.chat.dto.ChatRoomDto;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ChatRoomService {
    private final ConcurrentHashMap<String, Set<String>> roomSessionMap = new ConcurrentHashMap<>();
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    public ChatRoomService(ChatRoomRepository chatRoomRepository, UserRepository userRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.userRepository = userRepository;
    }

    public String createChatRoom(ChatRoomDto.ChatRoomReqDto chatroomInfo){

        String userUuid = UserUtil.getUserUuid();
        // 친구의 uuid
        String anotherUserUuid = chatroomInfo.getUserUuid();

        User friend = userRepository.findUserByUuid(anotherUserUuid).orElseThrow(
                () -> new UserException(ExceptionCodeSet.USER_NOT_FOUND));

        ChatRoom chatRoom = ChatRoom
                            .builder()
                            .title(chatroomInfo.getTitle())
                            // 방장 정보 저장
                            .user(userRepository.findUserByUuid(userUuid).get())
                            .build();

        ChatRoom makedRoom = chatRoomRepository.save(chatRoom);

        // 현재 채팅방에 속해있는 유저의 닉네임을 저장한다.
        joinRoom(makedRoom.getUuid(), chatroomInfo.getNickname());
        joinRoom(makedRoom.getUuid(), friend.getNickname());

        return makedRoom.getUuid();
    }

    public void joinRoom(String roomUuid, String nickname) {
        // map에 사용자 userUUid를 집어넣는다.
        roomSessionMap.computeIfAbsent(roomUuid, k -> new HashSet<>())
                .add(nickname);
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

    public Set<String> getUsersInRoom(String roomId) {
        return roomSessionMap.getOrDefault(roomId, new HashSet<>());
    }

    public boolean isUserInRoom(String roomUuId, String sessionId) {
        Set<String> sessions = roomSessionMap.get(roomUuId);
        return sessions != null && sessions.contains(sessionId);
    }
}