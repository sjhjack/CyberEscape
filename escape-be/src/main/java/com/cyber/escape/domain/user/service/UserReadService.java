package com.cyber.escape.domain.user.service;

import com.cyber.escape.domain.user.dto.UserDto;

public interface UserReadService {
	String generateNickname();
	UserDto.SearchNicknameResponse searchNickname(UserDto.SearchNicknameRequest dto);
	UserDto.CheckNicknameResponse checkNickname(UserDto.CheckNicknameRequest request);
}
