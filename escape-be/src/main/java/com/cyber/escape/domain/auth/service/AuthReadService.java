package com.cyber.escape.domain.auth.service;

import com.cyber.escape.domain.user.dto.UserDto;

public interface AuthReadService {
	UserDto.SigninResponse reIssue(UserDto.SigninResponse tokenRequest);
	String logout();
}
