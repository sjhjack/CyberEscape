package com.cyber.escape.domain.user.controller;

import com.cyber.escape.domain.rank.dto.GameHistoryDto;
import com.cyber.escape.domain.user.dto.UserDto;
import com.cyber.escape.domain.user.service.UserService;
import com.cyber.escape.global.common.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/user/nickname")
    public ApiResponse<UserDto.NicknameResponse> generateNickname(@RequestParam(value = "format", defaultValue = "json") String format,
                                                                  @RequestParam(value = "count", defaultValue = "1") int count) {
        UserDto.NicknameResponse response = userService.generateNickname(format, count);
        return new ApiResponse<>(HttpStatus.OK.value(), "닉네임 랜덤 생성 완료", response);
    }

    @PostMapping("/user/search")
    public ApiResponse<UserDto.SearchNicknameResponse> searchUser(@RequestBody UserDto.SearchNicknameRequest req){
        UserDto.SearchNicknameResponse response = userService.searchNickname(req);
        return new ApiResponse<>(HttpStatus.OK.value(),"닉네임 검색 완료", response);
    }

    @PostMapping("/user/nickname/duplication")
    public ApiResponse<UserDto.CheckNicknameResponse> checkNickname(@RequestBody UserDto.CheckNicknameRequest request) {
        UserDto.CheckNicknameResponse response = userService.checkNickname(request);
        return new ApiResponse<>(HttpStatus.OK.value(), "닉네임 중복 검사 완료", response);
    }

    @PatchMapping("/user/change")
    public ApiResponse<String> changeNickname(@RequestBody UserDto.UpdateNicknameRequest req) {
        String newNickname = userService.changeNickname(req);
        return new ApiResponse<>(HttpStatus.OK.value(), "닉네임 변경 완료", newNickname);
    }
}
