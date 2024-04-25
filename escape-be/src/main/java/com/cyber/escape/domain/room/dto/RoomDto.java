package com.cyber.escape.domain.room.dto;

import java.time.LocalDateTime;

import com.cyber.escape.domain.room.entity.Room;
import com.querydsl.core.annotations.QueryProjection;

import lombok.Builder;
import lombok.Getter;

public class RoomDto {

	@Builder
	@Getter
	public static class Request {
		private final String roomUuid;
		private final String userUuid;
	}

	@Builder
	@Getter
	public static class TimeRequest {
		private final String roomUuid;
		private final LocalDateTime startedAt;
	}

	@Builder
	@Getter
	public static class TimeResponse {
		private final String roomUuid;
		private final LocalDateTime startedAt;

		public static TimeResponse from(final Room room){
			return TimeResponse.builder()
				.roomUuid(room.getUuid())
				.startedAt(room.getStartedAt())
				.build();
		}
	}

	@Builder
	@Getter
	public static class InfoRequest {
		private final String title;
		private final String password;
		private final String themaUuid;
		private final String roomUuid;
	}

	@Builder
	@Getter
	public static class InfoResponse {
		private final String title;
		private final String password;

		public static InfoResponse from(final Room room){
			return InfoResponse.builder()
				.title(room.getTitle())
				.password(room.getPassword())
				.build();
		}
	}

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
		public Response(
			final String title,
			final String password,
			final int capacity,
			final LocalDateTime startedAt,
			final Long thema_id,
			final Long user_id,
			final String uuid
		) {
			this.title = title;
			this.password = password;
			this.capacity = capacity;
			this.startedAt = startedAt;
			this.thema_id = thema_id;
			this.user_id = user_id;
			this.uuid = uuid;
		}

		public static Response from(final Room room) {
			return Response.builder()
				.title(room.getTitle())
				.password(room.getPassword())
				.capacity(room.getCapacity())
				.startedAt(room.getStartedAt())
				.thema_id(room.getThema().getId())
				.user_id(room.getHost().getId())
				.uuid(room.getUuid())
				.build();
		}
	}
}
