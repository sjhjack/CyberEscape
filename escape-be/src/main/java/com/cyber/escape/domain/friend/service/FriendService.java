package com.cyber.escape.domain.friend.service;

import com.cyber.escape.domain.friend.dto.FriendDto;
import com.cyber.escape.domain.friend.entity.Friend;
import com.cyber.escape.domain.friend.repository.FriendRepository;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class FriendService {
    private final UserRepository userRepository;
    private final FriendRepository friendRepository;

    public void makeFriend(FriendDto.friendRequest dto){
        User fromUser = userRepository.findUserByUuid(dto.getFromUserUuid())
                .orElseThrow(() -> new RuntimeException("일치하는 사용자 없음"));
        User toUser = userRepository.findUserByUuid(dto.getToUserUuid())
                .orElseThrow(() -> new RuntimeException("일치하는 사용자 없음"));


        Friend fromUserToUser = new Friend(fromUser, toUser);
        Friend toUserFromUser = new Friend(toUser, fromUser);

        friendRepository.save(fromUserToUser);
        friendRepository.save(toUserFromUser);
    }
}
