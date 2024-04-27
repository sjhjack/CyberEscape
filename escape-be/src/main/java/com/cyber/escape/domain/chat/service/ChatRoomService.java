package com.cyber.escape.domain.chat.service;

import com.cyber.escape.domain.chat.data.DataInChatMap;
import com.cyber.escape.domain.chat.entity.ChatRoom;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;
import com.cyber.escape.domain.user.util.UserUtil;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.UserException;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.cyber.escape.domain.chat.Repository.ChatRoomRepository;
import com.cyber.escape.domain.chat.dto.ChatRoomDto;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class ChatRoomService {
    private final ConcurrentHashMap<String, Set<String>> roomSessionMap = new ConcurrentHashMap<>();
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    public ChatRoomService(ChatRoomRepository chatRoomRepository, UserRepository userRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ChatRoomDto.ChatRoomResDto createChatRoom(ChatRoomDto.ChatRoomReqDto chatroomInfo){

        String userUuid = UserUtil.getUserUuid();
        String friendUuid = chatroomInfo.getUserUuid();

        log.info("현재 들어온 user의 uuid : {}", friendUuid);

        List<String> uuidList = new ArrayList<>(Arrays.asList(userUuid, friendUuid));

        List<User> currentUsers = userRepository.findByUuids(uuidList).orElseThrow(
                () -> new UserException(ExceptionCodeSet.USER_NOT_FOUND));

        User createdRoomUser = currentUsers.get(0);
        User friendRoomUser = currentUsers.get(1);

        // 현재 유저가 해당 친구와 채팅방이 있다면 해당 roomUuid를 돌려줘야한다.
        // DB에 접근해야할듯. 이렇게 짜면 Map이 비워지는 즉시.. 삭제되어버린다.
        for(Map.Entry<String, Set<String>> existRoom : roomSessionMap.entrySet()){
            String roomUuid = existRoom.getKey();
            Set<String> userInfo = existRoom.getValue();
            // 닉네임을 기반해서 현재 존재하는 채팅방에 속해있는지를 찾는다.
            if(userInfo.contains(createdRoomUser.getNickname()) &&
                    userInfo.contains(friendRoomUser.getNickname())){
                return new ChatRoomDto.ChatRoomResDto(roomUuid);
            }
        }

        // 채팅방 생성한다.
        ChatRoom chatRoom = ChatRoom
                            .builder()
                            .title(chatroomInfo.getTitle())
                            // 방장 정보 저장
                            .user(userRepository.findUserByUuid(userUuid).get())
                            .build();


        ChatRoom makedRoom = chatRoomRepository.save(chatRoom);
        // 현재 채팅방에 속해있는 유저의 닉네임을 저장한다.

        // 여기 때문인..것 같진 않은데
        joinRoom(makedRoom.getUuid(), createdRoomUser.getNickname());
        joinRoom(makedRoom.getUuid(), friendRoomUser.getNickname());

        return new ChatRoomDto.ChatRoomResDto(makedRoom.getUuid());
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