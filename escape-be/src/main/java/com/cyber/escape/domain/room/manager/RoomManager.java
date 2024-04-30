package com.cyber.escape.domain.room.manager;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

import com.cyber.escape.domain.room.dto.RoomDto;
import com.cyber.escape.domain.user.dto.UserDto;
import com.cyber.escape.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class RoomManager {
	private final Map<String, RoomDto.StompResponse> roomMap = new ConcurrentHashMap<>();
	private final UserRepository userRepository;

	public RoomDto.StompResponse createRoom(String roomUuid, String userUuid, String hostSessionId) {
		UserDto.StompResponse host = UserDto.StompResponse.from(userRepository.findUserByUuid(userUuid)
			.orElseThrow(() -> new RuntimeException("일치하는 사용자가 없습니다.")));
		RoomDto.StompResponse room = new RoomDto.StompResponse(hostSessionId);
		room.setHost(host);
		roomMap.put(roomUuid, room);

		return room;
	}

	public RoomDto.StompResponse joinRoom(String roomUuid, String userUuid, String guestSessionId) {
		RoomDto.StompResponse room = getRoom(roomUuid);

		if (isGuestInRoom(room)) {
			UserDto.StompResponse guest = UserDto.StompResponse.from(userRepository.findUserByUuid(userUuid)
				.orElseThrow(() -> new RuntimeException("일치하는 사용자가 없습니다.")));

			room.joinGuest(guestSessionId, guest);
		}

		return room;
	}

	public RoomDto.StompResponse leaveRoom(String roomUuid, String sessionId) {
		RoomDto.StompResponse room = getRoom(roomUuid);

		if (room.getHostSessionId().equals(sessionId)) {
			// host인 경우 대기방 삭제
			roomMap.remove(roomUuid);
		} else if (room.getGuestSessionId() != null && room.getGuestSessionId().equals(sessionId)) {
			// guest인 경우 guest 정보 null 처리
			room.kickGuest();

			return room;
		}

		return new RoomDto.StompResponse(null);
	}

	public RoomDto.StompResponse kickGuest(String roomUuid) {
		RoomDto.StompResponse room = getRoom(roomUuid);
		room.kickGuest();

		return room;
	}

	public RoomDto.StompResponse delegateHost(String roomUuid) {
		RoomDto.StompResponse room = getRoom(roomUuid);
		room.swapHost(getGuestSessionId(room));

		return room;
	}

	public boolean isHostInRoom(String roomUuid, String sessionId) {
		RoomDto.StompResponse room = getRoom(roomUuid);

		if(room.getHostSessionId().equals(sessionId)) {
			return true;
		}

		throw new RuntimeException("방장이 아닙니다.");
	}

	private RoomDto.StompResponse getRoom(String roomUuid) {
		RoomDto.StompResponse room = roomMap.get(roomUuid);

		if(room == null){
			throw new RuntimeException("존재하지 않는 대기방입니다.");
		}

		return room;
	}

	private boolean isGuestInRoom(RoomDto.StompResponse room) {
		if(room.getGuestSessionId() == null){
			return true;
		}

		throw new RuntimeException("대기방이 가득 찼습니다.");
	}

	private String getGuestSessionId(RoomDto.StompResponse room) {
		if (room.getGuestSessionId() != null) {
			return room.getGuestSessionId();
		} else {
			throw new RuntimeException("게스트가 존재하지 않습니다.");
		}
	}
}
