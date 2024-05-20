package com.cyber.escape.domain.room.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.cyber.escape.domain.room.data.RoomUpdateSetting;
import com.cyber.escape.domain.room.dto.RoomDto;
import com.cyber.escape.domain.thema.entity.Thema;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.global.common.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Room extends BaseEntity {
	// title, password, startedAt, updator는 변경감지 update를 위해 Setter 사용
	@Setter
	private String title;

	@Setter
	private String password;

	@Setter
	private int capacity;

	@CreatedDate
	@Setter
	@Column(name = "started_at")
	private LocalDateTime startedAt;

	@ManyToOne
	@JoinColumn(name = "thema_id", referencedColumnName = "id")
	private Thema thema;

	@Setter
	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User host;

	@ManyToOne
	@JoinColumn(name = "created_user", referencedColumnName = "id")
	private User creator;

	@Setter
	@ManyToOne
	@JoinColumn(name = "updated_user", referencedColumnName = "id")
	private User updator;

	@ColumnDefault("0")
	private boolean hasPassword;

	public void updateSetting(final RoomUpdateSetting setting) {
		title = setting.title();
		password = setting.password();
		updator = host;
	}

	// host id 캡슐화
	public long getHostId() {
		return host.getId();
	}

	public String getHostUuid() {
		return host.getUuid();
	}

	public static Room of(
		final String title,
		final int capacity,
		final User host,
		final Thema thema
	) {
		return Room.builder()
			.title(title)
			.capacity(capacity)
			.thema(thema)
			.host(host)
			.creator(host)
			.updator(host)
			.build();
	}

	public void setPassword(final String encryptPassword) {
		password = encryptPassword;
		hasPassword = true;
	}
}
