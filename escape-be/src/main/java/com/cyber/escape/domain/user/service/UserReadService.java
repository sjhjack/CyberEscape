package com.cyber.escape.domain.user.service;

import com.cyber.escape.domain.user.dto.UserDto;

import java.util.List;

public interface UserReadService {
	String generateNickname();
	List<UserDto.SearchNicknameResponse> searchNickname(UserDto.SearchNicknameRequest dto);
	UserDto.CheckNicknameResponse checkNickname(UserDto.CheckNicknameRequest request);
}
