package com.cyber.escape.domain.friend.controller;

import com.cyber.escape.domain.friend.dto.FriendDto;
import com.cyber.escape.domain.friend.service.FriendService;
import com.cyber.escape.domain.rank.dto.GameHistoryDto;
import com.cyber.escape.global.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class FriendController {
    private final FriendService friendService;

    @PostMapping("/friend/request")
    public ApiResponse<String> makeFriend(@RequestBody FriendDto.friendRequest req){
        friendService.makeFriend(req);
        return new ApiResponse<>(HttpStatus.OK.value(), "친구 등록 성공", "");
    }
}
