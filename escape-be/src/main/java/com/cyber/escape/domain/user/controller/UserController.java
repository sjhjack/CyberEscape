package com.cyber.escape.domain.user.controller;

import com.cyber.escape.domain.user.dto.UserDto;
import com.cyber.escape.domain.user.service.UserService;
import com.cyber.escape.global.common.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
