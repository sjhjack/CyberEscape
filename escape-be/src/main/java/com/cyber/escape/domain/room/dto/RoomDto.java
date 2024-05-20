package com.cyber.escape.domain.room.dto;

import java.time.LocalDateTime;

import com.cyber.escape.domain.room.entity.Room;
import com.cyber.escape.domain.user.dto.UserDto;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.RoomException;
import com.querydsl.core.annotations.QueryProjection;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class RoomDto {

	@Builder
	@Getter
	public static class Request {
		private final String roomUuid;
		private final String userUuid;
	}

	@Builder
	@Getter
	public static class KickRequest {
		private String roomUuid;

		public KickRequest(){}

		public KickRequest(String roomUuid) {
			this.roomUuid = roomUuid;
		}
	}

	@Builder
	@Getter
	public static class JoinRequest {
		private final String roomUuid;
		private final String userUuid;
		private final String password;

		// public JoinRequest(final String roomUuid, final String userUuid, final String password){
		// 	this.roomUuid = roomUuid;
		// 	this.userUuid = userUuid;
		// 	this.password = password;
		// }
		//
		// public JoinRequest(final String roomUuid, final String userUuid){
		// 	this(roomUuid, userUuid, "");
		// }
	}

	@Builder
	@Getter
	public static class PostRequest {
		private final String title;
		private final int category;
		private final String password;
		private final String hostUuid;
	}

	@Builder
	@Getter
	public static class PostResponse {
		private final String title;
		private final String roomUuid;
		private final String hostUuid;
		private final int category;

		public static PostResponse of(final String title, final String roomUuid, final String hostUuid, final int category) {
			return PostResponse.builder()
				.title(title)
				.roomUuid(roomUuid)
				.hostUuid(hostUuid)
				.category(category)
				.build();
		}
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

		public static InfoResponse from(final Room room){
			return InfoResponse.builder()
				.title(room.getTitle())
				.build();
		}
	}


	// 초대 응답 받았을 때의 반환값
	@Builder
	@Getter
	public static class AcceptResponse{
		private final String roomUuid;
		private final String title;
		private final int themaCategory;

		public static AcceptResponse from(Room room){
			return AcceptResponse
					.builder()
					.roomUuid(room.getUuid())
					.title(room.getTitle())
					.themaCategory(room.getThema().getCategory())
					.build();
		}
	}

	@Builder
	@Getter
	public static class Response {
		private final String title;
		// private final String password;
		private final int capacity;
		private final LocalDateTime startedAt;
		private final Long themaId;
		private final Long userId;
		// private final Long created_user;
		// private final Long updated_user;
		private final String uuid;

		@QueryProjection
		public Response(
			final String title,
			// final String password,
			final int capacity,
			final LocalDateTime startedAt,
			final Long themaId,
			final Long userId,
			final String uuid
		) {
			this.title = title;
			// this.password = password;
			this.capacity = capacity;
			this.startedAt = startedAt;
			this.themaId = themaId;
			this.userId = userId;
			this.uuid = uuid;
		}

		public static Response from(final Room room) {
			return Response.builder()
				.title(room.getTitle())
				// .password(room.getPassword())
				.capacity(room.getCapacity())
				.startedAt(room.getStartedAt())
				.themaId(room.getThema().getId())
				.userId(room.getHost().getId())
				.uuid(room.getUuid())
				.build();
		}
	}

	@Getter
	public static class StompResponse {
		private String hostSessionUuid;
		private String guestSessionUuid;
		@Setter
		private UserDto.StompResponse host;
		private UserDto.StompResponse guest;
		private boolean isHostReady;
		private boolean isGuestReady;
		private int hostProgress;
		private int guestProgress;
		private boolean isKicked;

		public StompResponse(String hostSessionUuid){
			this.hostSessionUuid = hostSessionUuid;
		}

		public void swapHost(String guestSessionUuid) {
			String tmpSessionUuid = this.hostSessionUuid;
			this.hostSessionUuid = guestSessionUuid;
			this.guestSessionUuid = tmpSessionUuid;

			UserDto.StompResponse tmpUser = this.host;
			this.host = this.guest;
			this.guest = tmpUser;
		}

		public void joinGuest(String guestSessionUuid, UserDto.StompResponse guest){
			this.guestSessionUuid = guestSessionUuid;
			this.guest = guest;
		}

		public void kickGuest() {
			this.isKicked = true;
		}

		public void leaveGuest() {
			this.guestSessionUuid = null;
			this.guest = null;
			this.isGuestReady = false;
			this.isKicked = false;
		}

		public void changeReadyStatus(String sessionUuid) {
			if(hostSessionUuid != null && hostSessionUuid.equals(sessionUuid)) {
				isHostReady = !isHostReady;
			} else if(guestSessionUuid != null && guestSessionUuid.equals(sessionUuid)) {
				isGuestReady = !isGuestReady;
			} else {
				throw new RoomException(ExceptionCodeSet.ROOM_INVALID_USER);
			}
		}

		public void updateProgress(String sessionUuid) {
			if(hostSessionUuid != null && hostSessionUuid.equals(sessionUuid)) {
				hostProgress++;
			} else if(guestSessionUuid != null && guestSessionUuid.equals(sessionUuid)) {
				guestProgress++;
			} else {
				throw new RoomException(ExceptionCodeSet.ROOM_INVALID_USER);
			}
		}

		public void resetStatus() {
			isHostReady = false;
			isGuestReady = false;
			hostProgress = 0;
			guestProgress = 0;
		}
	}
}
