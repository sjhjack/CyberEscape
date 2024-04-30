package com.cyber.escape.domain.room.manager;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

import com.cyber.escape.domain.room.dto.RoomDto;
import com.cyber.escape.domain.user.dto.UserDto;
import com.cyber.escape.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RoomManager {
	private final Map<String, RoomDto.StompResponse> roomMap = new ConcurrentHashMap<>();
	private final UserRepository userRepository;

	public void createRoom(String roomUuid, String userUuid, String hostSessionId) {
		UserDto.StompResponse host = UserDto.StompResponse.from(userRepository.findUserByUuid(userUuid)
			.orElseThrow(() -> new RuntimeException("일치하는 사용자가 없습니다.")));
		RoomDto.StompResponse room = new RoomDto.StompResponse(hostSessionId);
		room.setHost(host);
		roomMap.put(roomUuid, room);
	}

	public void joinRoom(String roomUuid, String userUuid, String guestSessionId) {
		RoomDto.StompResponse room = getRoom(roomUuid);

		if (room.getGuestSessionId() == null) {
			UserDto.StompResponse guest = UserDto.StompResponse.from(userRepository.findUserByUuid(userUuid)
				.orElseThrow(() -> new RuntimeException("일치하는 사용자가 없습니다.")));

			room.setGuestSessionId(guestSessionId);
			room.setGuest(guest);
		} else {
			throw new RuntimeException("대기방이 가득 찼습니다.");
		}
	}

	public RoomDto.StompResponse leaveRoom(String roomUuid, String sessionId) {
		RoomDto.StompResponse room = getRoom(roomUuid);

		if (room.getHostSessionId().equals(sessionId)) {
			// host인 경우 대기방 삭제
			roomMap.remove(roomUuid);
		} else if (room.getGuestSessionId() != null && room.getGuestSessionId().equals(sessionId)) {
			// guest인 경우 guest 정보 null 처리
			room.setGuestSessionId(null);
			room.setGuest(null);

			return room;
		}

		return new RoomDto.StompResponse(null);
	}

	public String kickGuest(String roomUuid) {
		RoomDto.StompResponse room = getRoom(roomUuid);
		String guestSessionId = "";

		if (room.getGuestSessionId() != null) {
			guestSessionId = room.getGuestSessionId();
			room.setGuestSessionId(null);
			room.setGuest(null);
		} else {
			throw new RuntimeException("게스트가 존재하지 않습니다.");
		}

		return guestSessionId;
	}

	public RoomDto.StompResponse delegateHost(String roomUuid, String guestSessionId) {
		RoomDto.StompResponse room = getRoom(roomUuid);

		if (room.getGuestSessionId() != null && room.getGuestSessionId().equals(guestSessionId)) {
			room.swapHost(guestSessionId);
		} else {
			throw new RuntimeException("올바르지 않은 대상입니다.");
		}

		return room;
	}
	
	public RoomDto.StompResponse getRoom(String roomUuid) {
		RoomDto.StompResponse room = roomMap.get(roomUuid);

		if(room == null){
			throw new RuntimeException("존재하지 않는 대기방입니다.");
		}

		return room;
	}

	public boolean isHostInRoom(String roomUuid, String sessionId) {
		RoomDto.StompResponse room = roomMap.get(roomUuid);
		return room != null && room.getHostSessionId().equals(sessionId);
	}

	public boolean isGuestInRoom(String roomUuid, String sessionId) {
		RoomDto.StompResponse room = roomMap.get(roomUuid);
		return room != null && room.getGuestSessionId() != null && room.getGuestSessionId().equals(sessionId);
	}
}
