package com.cyber.escape.domain.user.controller;

import java.io.IOException;

import com.cyber.escape.domain.user.dto.UserDto;
import com.cyber.escape.domain.auth.service.AuthService;
import com.cyber.escape.domain.user.service.UserService;
import com.cyber.escape.global.common.dto.ApiResponse;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/nickname")
    public ApiResponse<String> generateNickname() {
        return new ApiResponse<>(HttpStatus.OK.value(), "닉네임 랜덤 생성 완료", userService.generateNickname());
    }

    @PostMapping("/search")
    public ApiResponse<UserDto.SearchNicknameResponse> searchUser(@RequestBody UserDto.SearchNicknameRequest req){
        UserDto.SearchNicknameResponse response = userService.searchNickname(req);
        return new ApiResponse<>(HttpStatus.OK.value(),"닉네임 검색 완료", response);
    }

    @PostMapping("/nickname/duplication")
    public ApiResponse<UserDto.CheckNicknameResponse> checkNickname(@RequestBody UserDto.CheckNicknameRequest request) {
        UserDto.CheckNicknameResponse response = userService.checkNickname(request);
        return new ApiResponse<>(HttpStatus.OK.value(), "닉네임 중복 검사 완료", response);
    }

    @PatchMapping("/change")
    public ApiResponse<String> changeNickname(@RequestBody UserDto.UpdateNicknameRequest req) {
        String newNickname = userService.changeNickname(req);
        return new ApiResponse<>(HttpStatus.OK.value(), "닉네임 변경 완료", newNickname);
    }

    @PatchMapping("/image/change")
    public ApiResponse<String> changeProfileImage(@RequestPart MultipartFile multipartFile) throws IOException {
        return new ApiResponse<>(HttpStatus.OK.value(), "프로필 이미지 변경 완료", userService.changeProfileImage(multipartFile));
    }

    @PatchMapping("/image/delete")
    public ApiResponse<String> deleteProfileImage() throws IOException {
        return new ApiResponse<>(HttpStatus.OK.value(), "프로필 이미지 삭제 완료", userService.deleteProfileImage());
    }

    @PostMapping("/dummy/image")
    public ApiResponse<String> putDummyImage(@RequestPart MultipartFile multipartFile) throws IOException {
        return new ApiResponse<>(HttpStatus.OK.value(), "더미 이미지 등록 완료", userService.putDummyImage(multipartFile));
    }
}
