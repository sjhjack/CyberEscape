package com.cyber.escape.domain.room;

import java.time.LocalDateTime;

import com.cyber.escape.domain.member.entity.User;
import com.cyber.escape.domain.thema.entity.Thema;
import com.cyber.escape.global.common.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Room extends BaseEntity {
	private String title;

	private String password;

	private int capacity;

	@Column(name = "started_at")
	private LocalDateTime startedAt;

	@ManyToOne
	@JoinColumn(name = "thema_id", referencedColumnName = "id")
	private Thema thema;

	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User host;

	@ManyToOne
	@JoinColumn(name = "created_user", referencedColumnName = "id")
	private User creator;

	@ManyToOne
	@JoinColumn(name = "updated_user", referencedColumnName = "id")
	private User updator;
}
