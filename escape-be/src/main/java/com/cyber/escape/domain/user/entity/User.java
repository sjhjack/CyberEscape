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
	@Column(name = "login_id")
	private String loginId;

	private String password;

	private String nickname;

	private int point;

	private boolean withdrawal;
	private String profileUrl;
	private String savedFileName;

	public static User from(final UserDto.SignupRequest signupRequest){
		return User.builder()
			.loginId(signupRequest.getLoginId())
			.password(signupRequest.getPassword())
			.nickname(signupRequest.getNickname())
			.profileUrl(signupRequest.getProfileUrl())
			.savedFileName(signupRequest.getSavedFileName())
			.build();
	}

	public void initializeUserInfo() {
		this.loginId = "탈퇴한 사용자";
		this.password = "";
		this.nickname = "탈퇴한 사용자";
		this.point = 0;
		this.withdrawal = true;
		// this.profileUrl = "";
		// Todo : S3에서 사진 삭제
	}

	public void changeProfileImage(final String savedFileName, final String profileUrl) {
		this.savedFileName = savedFileName;
		this.profileUrl = profileUrl;
	}
}
