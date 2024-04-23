package com.cyber.escape.domain.member.entity;

import com.cyber.escape.global.common.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {
	@Column(name = "login_id")
	private String loginId;

	private String password;

	private String nickname;

	private int point = 0;

	@Column(name = "character_id")
	private Long characterId;

	private boolean withdrawal;
}
