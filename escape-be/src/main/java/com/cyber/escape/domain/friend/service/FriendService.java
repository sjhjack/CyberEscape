package com.cyber.escape.domain.friend.service;

import com.cyber.escape.domain.friend.dto.FriendDto;
import com.cyber.escape.domain.friend.entity.Friend;
import com.cyber.escape.domain.friend.repository.FriendRepository;
import com.cyber.escape.domain.friend.repository.FriendRepositoryImpl;
import com.cyber.escape.domain.notification.document.Notify;
import com.cyber.escape.domain.notification.service.NotificationService;
import com.cyber.escape.domain.rank.dto.RankingDto;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;
import com.cyber.escape.domain.user.util.UserUtil;
import com.cyber.escape.global.common.util.IdFinder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.util.ArrayList;
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
    private final UserUtil userUtil;


    private final IdFinder idFinder;

    public void makeFriend(FriendDto.FriendRelationRequest dto){
        String currentUserUuid = userUtil.getLoginUserUuid();

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

    public List<FriendDto.FriendListResponse> getMyFriendList(int pageNumber){
        String userUuid = userUtil.getLoginUserUuid();

        Long userId = idFinder.findIdByUuid(userUuid, User.class);

        int pageSize = 10;
        int startIndex = (pageNumber - 1) * pageSize;
        //전체 랭킹

        List<FriendDto.FriendListResponse> friendList = friendRepositoryImpl.findFriendList(userId);

        int endIndex = Math.min(startIndex + pageSize, friendList.size());

        for (int i = startIndex; i < endIndex; i++) {
            friendList.add(friendList.get(i));
        }

        return friendList;
    }

    public String removeFriend(Map<String, String> req){
        Long currentUserId = idFinder.findIdByUuid(userUtil.getLoginUserUuid(), User.class);
        Long friendId = idFinder.findIdByUuid(req.get("friendUuid"), User.class);

        friendRepositoryImpl.removeFriend(currentUserId, friendId);

        return "";
    }
}
