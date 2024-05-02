package com.cyber.escape.domain.user.entity;

import com.cyber.escape.domain.user.dto.UserDto;
import com.cyber.escape.global.common.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {
	@Column(name = "login_id", unique = true)
	private String loginId;

	private String password;

	private String nickname;

	private int point;

	private boolean withdrawal;
	private String profileUrl;

	public static User from(UserDto.SignupRequest signupRequest){
		return User.builder()
			.loginId(signupRequest.getLoginId())
			.password(signupRequest.getPassword())
			.nickname(signupRequest.getNickname())
			.profileUrl(signupRequest.getProfileUrl())
			.build();
	}
}
