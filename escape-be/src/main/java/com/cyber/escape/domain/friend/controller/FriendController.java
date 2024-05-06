package com.cyber.escape.domain.friend.controller;

import com.cyber.escape.domain.friend.dto.FriendDto;
import com.cyber.escape.domain.friend.service.FriendService;
import com.cyber.escape.domain.notification.dto.NotifyDto;
import com.cyber.escape.domain.rank.dto.GameHistoryDto;
import com.cyber.escape.global.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/friend")
@RequiredArgsConstructor
public class FriendController {
    private final FriendService friendService;


    @PostMapping("/acceptance")
    public ApiResponse<String> makeFriend(@RequestBody FriendDto.FriendRelationRequest req){
        friendService.makeFriend(req);
        return new ApiResponse<>(HttpStatus.OK.value(), "친구 등록 성공", "");
    }

    @PostMapping("/request")
    public ApiResponse<String> askToFriend(@RequestBody FriendDto.FriendRequest req){
        String result = friendService.sendToRequest(req);
        return new ApiResponse<>(HttpStatus.OK.value(), "친구 요청을 보냈습니다.", "");
    }

    // 친구 목록
    @PostMapping("/list")
    public ApiResponse<List<FriendDto.FriendListResponse>> getMyFriendList(){
        return new ApiResponse<>(HttpStatus.OK.value(), "내 친구 목록을 가져왔습니다.", friendService.getMyFriendList());
    }

    @PostMapping("/remove")
    public ApiResponse removeRelationship(@RequestBody Map<String, String> friendInfo){
        return new ApiResponse<>(HttpStatus.OK.value(), "내 친구 목록을 가져왔습니다.", friendService.removeFriend(friendInfo));
    }


}
