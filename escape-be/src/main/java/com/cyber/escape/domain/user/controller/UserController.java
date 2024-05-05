package com.cyber.escape.domain.user.controller;

import java.io.IOException;

import com.cyber.escape.domain.user.dto.UserDto;
import com.cyber.escape.domain.user.service.AuthService;
import com.cyber.escape.domain.user.service.UserService;
import com.cyber.escape.global.common.dto.ApiResponse;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {
    // Todo : Auth랑 User 나누자

    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/auth/signup")
    public ApiResponse<String> signup(@RequestBody UserDto.SignupRequest signupRequest) {
        return new ApiResponse<>(HttpStatus.OK.value(), "회원가입 완료", authService.signup(signupRequest));
    }

    @PostMapping("/auth/signin")
    public ApiResponse<UserDto.SigninResponse> signin(@RequestBody UserDto.SigninRequest signinRequest) {
        return new ApiResponse<>(HttpStatus.OK.value(), "로그인 완료", authService.signin(signinRequest));
    }

    @PostMapping("/auth/refresh")
    public ApiResponse<UserDto.SigninResponse> reIssue(@RequestBody UserDto.SigninResponse tokenRequest) {
        return new ApiResponse<>(HttpStatus.OK.value(), "생성 성공", authService.reIssue(tokenRequest));
    }

    @PostMapping("/auth/logout")
    public ApiResponse<String> logout() {
        return new ApiResponse<>(HttpStatus.OK.value(), "로그아웃 성공", authService.logout());
    }

    @PatchMapping("/auth/quit")
    public ApiResponse<String> quit() {
        return new ApiResponse<>(HttpStatus.OK.value(), "회원 탈퇴 성공", authService.quit());
    }

    @PostMapping("/user/nickname")
    public ApiResponse<String> generateNickname() {
        return new ApiResponse<>(HttpStatus.OK.value(), "닉네임 랜덤 생성 완료", userService.generateNickname());
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

    @PatchMapping("/user/image/change")
    public ApiResponse<String> changeProfileImage(@RequestPart MultipartFile multipartFile) throws IOException {
        return new ApiResponse<>(HttpStatus.OK.value(), "프로필 이미지 변경 완료", userService.changeProfileImage(multipartFile));
    }

    @PatchMapping("/user/image/delete")
    public ApiResponse<String> deleteProfileImage() throws IOException {
        return new ApiResponse<>(HttpStatus.OK.value(), "프로필 이미지 삭제 완료", userService.deleteProfileImage());
    }
}
