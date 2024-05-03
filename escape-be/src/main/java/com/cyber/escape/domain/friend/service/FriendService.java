package com.cyber.escape.domain.friend.service;

import com.cyber.escape.domain.friend.dto.FriendDto;
import com.cyber.escape.domain.friend.entity.Friend;
import com.cyber.escape.domain.friend.repository.FriendRepository;
import com.cyber.escape.domain.notification.document.Notify;
import com.cyber.escape.domain.notification.dto.NotifyDto;
import com.cyber.escape.domain.notification.service.NotificationService;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;
import com.cyber.escape.domain.user.util.UserUtil;
import com.cyber.escape.global.common.util.IdFinder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FriendService {
    private final UserRepository userRepository;
    private final FriendRepository friendRepository;
    private final NotificationService notificationService;

    public void makeFriend(FriendDto.friendRelationRequest dto){
        User fromUser = userRepository.findUserByUuid(dto.getFromUserUuid())
                .orElseThrow(() -> new RuntimeException("일치하는 사용자 없음"));
        User toUser = userRepository.findUserByUuid(dto.getToUserUuid())
                .orElseThrow(() -> new RuntimeException("일치하는 사용자 없음"));


        Friend fromUserToUser = new Friend(fromUser, toUser);
        Friend toUserFromUser = new Friend(toUser, fromUser);

        friendRepository.save(fromUserToUser);
        friendRepository.save(toUserFromUser);
    }

    public String sendToRequest(FriendDto.friendRequest req){

        // 요청을 보낸다.
        // DB에 저장한다.
        if(req.getNotifyType().equals("GAME")){
            notificationService.send(req.getReceiverUuid(), Notify.NotificationType.GAME, "게임 요청입니다.");
        }

        if(req.getNotifyType().equals("FRIEND")){
            notificationService.send(req.getReceiverUuid(), Notify.NotificationType.FRIEND, "친구 요청입니다.");
        }

        return "";
    }

    public List<NotifyDto.Response> getMyFriendList(){
        String userUuid = UserUtil.getUserUuid();
        IdFinder.
    }
}
