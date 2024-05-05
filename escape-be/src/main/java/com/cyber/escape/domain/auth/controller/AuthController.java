package com.cyber.escape.domain.auth.controller;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cyber.escape.domain.auth.service.AuthService;
import com.cyber.escape.domain.user.dto.UserDto;
import com.cyber.escape.global.common.dto.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
	private final AuthService authService;

	@PostMapping("/signup")
	public ApiResponse<String> signup(@RequestBody UserDto.SignupRequest signupRequest) {
		return new ApiResponse<>(HttpStatus.OK.value(), "회원가입 완료", authService.signup(signupRequest));
	}

	@PostMapping("/signin")
	public ApiResponse<UserDto.SigninResponse> signin(@RequestBody UserDto.SigninRequest signinRequest) {
		return new ApiResponse<>(HttpStatus.OK.value(), "로그인 완료", authService.signin(signinRequest));
	}

	@PostMapping("/refresh")
	public ApiResponse<UserDto.SigninResponse> reIssue(@RequestBody UserDto.SigninResponse tokenRequest) {
		return new ApiResponse<>(HttpStatus.OK.value(), "생성 성공", authService.reIssue(tokenRequest));
	}

	@PostMapping("/logout")
	public ApiResponse<String> logout() {
		return new ApiResponse<>(HttpStatus.OK.value(), "로그아웃 성공", authService.logout());
	}

	@PatchMapping("/quit")
	public ApiResponse<String> quit() throws IOException {
		return new ApiResponse<>(HttpStatus.OK.value(), "회원 탈퇴 성공", authService.quit());
	}
}
