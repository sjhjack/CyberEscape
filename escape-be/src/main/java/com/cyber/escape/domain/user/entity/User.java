package com.cyber.escape.domain.user.entity;

import com.cyber.escape.global.common.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {
	@Column(name = "login_id")
	private String loginId;

	private String password;

	private String nickname;

	private int point;

	@Column(name = "character_id")
	private Long characterId;

	private boolean withdrawal;
	private String profileUrl;
}
