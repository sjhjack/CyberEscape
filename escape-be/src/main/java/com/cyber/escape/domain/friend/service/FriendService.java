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
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.FriendException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

        if(dto.getToUserUuid().equals(currentUserUuid))
            throw new FriendException(ExceptionCodeSet.NO_SELF_FRIEND);

        log.info("친구 추가하려는 유저의 uuid : {}", dto.getToUserUuid());
        User fromUser = userRepository.findUserByUuid(currentUserUuid)
                .orElseThrow(() -> new FriendException(ExceptionCodeSet.ENTITY_NOT_EXISTS));
        User toUser = userRepository.findUserByUuid(dto.getToUserUuid())
                .orElseThrow(() -> new FriendException(ExceptionCodeSet.ENTITY_NOT_EXISTS));

        Optional<Friend> friend = friendRepository.getFriend(currentUserUuid, dto.getToUserUuid());
        // 이미 친구 관계라면
        if(friend.isPresent()){
            throw new FriendException(ExceptionCodeSet.ALREADY_FRIEND);
        }

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


        List<FriendDto.FriendListResponse> friendListPerPages = new ArrayList<>();
        int pageSize = 10;
        int startIndex = (pageNumber - 1) * pageSize;

        List<FriendDto.FriendListResponse> friendList = friendRepositoryImpl.findFriendList(userId);

        int endIndex = Math.min(startIndex + pageSize, friendList.size());

        for (int i = startIndex; i < endIndex; i++) {
            friendListPerPages.add(friendList.get(i));
        }

        return friendListPerPages;
    }

    public String removeFriend(Map<String, String> req){
        Long currentUserId = idFinder.findIdByUuid(userUtil.getLoginUserUuid(), User.class);
        Long friendId = idFinder.findIdByUuid(req.get("friendUuid"), User.class);

        friendRepositoryImpl.removeFriendAndInsertLogHistory(currentUserId, friendId);

        return "";
    }
}
