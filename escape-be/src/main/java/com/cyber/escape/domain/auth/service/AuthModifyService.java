package com.cyber.escape.domain.auth.service;

import java.io.IOException;

import com.cyber.escape.domain.user.dto.UserDto;

public interface AuthModifyService {
	String signup(UserDto.SignupRequest signupRequest);
	UserDto.SigninResponse signin(UserDto.SigninRequest signinRequest);
	String quit() throws IOException;
}
