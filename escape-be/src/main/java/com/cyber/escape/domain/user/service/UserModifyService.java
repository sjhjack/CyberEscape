package com.cyber.escape.domain.user.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.cyber.escape.domain.user.dto.UserDto;

public interface UserModifyService {
	String changeNickname(UserDto.UpdateNicknameRequest dto);
	String changeProfileImage(MultipartFile multipartFile) throws IOException;
	String deleteProfileImage() throws IOException;
	String putDummyImage(MultipartFile multipartFile) throws IOException;
}
