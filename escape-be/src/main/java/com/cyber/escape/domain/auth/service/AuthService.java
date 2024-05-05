package com.cyber.escape.domain.auth.service;

import java.io.IOException;

import com.cyber.escape.domain.user.dto.UserDto;

public interface AuthService {
	// Todo : Read랑 Modify (Create, Update, Delete)로 분리하자
	String signup(UserDto.SignupRequest signupRequest);
	UserDto.SigninResponse signin(UserDto.SigninRequest signinRequest);
	UserDto.SigninResponse reIssue(UserDto.SigninResponse tokenRequest);
	String logout();
	String quit() throws IOException;
}
