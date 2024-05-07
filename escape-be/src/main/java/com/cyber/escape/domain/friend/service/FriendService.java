package com.cyber.escape.domain.friend.service;

import com.cyber.escape.domain.friend.dto.FriendDto;
import com.cyber.escape.domain.friend.entity.Friend;
import com.cyber.escape.domain.friend.repository.FriendRepository;
import com.cyber.escape.domain.friend.repository.FriendRepositoryImpl;
import com.cyber.escape.domain.notification.document.Notify;
import com.cyber.escape.domain.notification.service.NotificationService;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;
import com.cyber.escape.domain.user.util.UserUtil;
import com.cyber.escape.global.common.util.IdFinder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class FriendService {
    private final UserRepository userRepository;
    private final FriendRepository friendRepository;
    private final NotificationService notificationService;
    private final FriendRepositoryImpl friendRepositoryImpl;

    private final IdFinder idFinder;

    public void makeFriend(FriendDto.FriendRelationRequest dto){
        String currentUserUuid = "c83ec6b2-0470-11ef-9c95-0242ac101404";
        User fromUser = userRepository.findUserByUuid(currentUserUuid)
                .orElseThrow(() -> new RuntimeException("일치하는 사용자 없음"));
        User toUser = userRepository.findUserByUuid(dto.getToUserUuid())
                .orElseThrow(() -> new RuntimeException("일치하는 사용자 없음"));


        Friend fromUserToUser = new Friend(fromUser, toUser);
        Friend toUserFromUser = new Friend(toUser, fromUser);

        friendRepository.save(fromUserToUser);
        friendRepository.save(toUserFromUser);
    }

    public String sendToRequest(FriendDto.FriendRequest req){

        notificationService.send(req.getReceiverUuid(), "", Notify.NotificationType.FRIEND, "친구 요청입니다.");

        return "";
    }

    public List<FriendDto.FriendListResponse> getMyFriendList(){
        String userUuid = UserUtil.getUserUuid();

        Long userId = idFinder.findIdByUuid(userUuid, User.class);

        return friendRepositoryImpl.findFriendList(userId);
    }

    public String removeFriend(Map<String, String> req){
        Long currentUserId = idFinder.findIdByUuid(UserUtil.getUserUuid(), User.class);
        Long friendId = idFinder.findIdByUuid(req.get("friendUuid"), User.class);

        friendRepositoryImpl.removeFriend(currentUserId, friendId);

        return "";
    }
}
