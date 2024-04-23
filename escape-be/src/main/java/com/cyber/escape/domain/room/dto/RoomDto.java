package com.cyber.escape.domain.room.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.cyber.escape.domain.member.entity.User;
import com.cyber.escape.domain.room.entity.Room;
import com.cyber.escape.domain.thema.entity.Thema;
import com.querydsl.core.annotations.QueryProjection;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;

public class RoomDto {

	@Builder
	@Getter
	public static class Response {
		private final String title;
		private final String password;
		private final int capacity;
		private final LocalDateTime startedAt;
		private final Long thema_id;
		private final Long user_id;
		// private final Long created_user;
		// private final Long updated_user;
		private final String uuid;

		@QueryProjection
		public Response(String title, String password, int capacity, LocalDateTime startedAt, Long thema_id, Long user_id, String uuid){
			this.title = title;
			this.password = password;
			this.capacity = capacity;
			this.startedAt = startedAt;
			this.thema_id = thema_id;
			this.user_id = user_id;
			this.uuid = uuid;
		}

		public static Response from(Room room){
			return Response.builder()
				.title(room.getTitle())
				.password(room.getPassword())
				.capacity(room.getCapacity())
				.startedAt(room.getStartedAt())
				.thema_id(room.getThema().getId())
				.user_id(room.getHost().getId())
				// .uuid(room.getUuid())
				.uuid("uuid")
				.build();
		}
	}
}
