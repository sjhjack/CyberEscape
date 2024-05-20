package com.cyber.escape.domain.room.manager;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

import com.cyber.escape.domain.room.dto.RoomDto;
import com.cyber.escape.domain.user.dto.UserDto;
import com.cyber.escape.domain.user.repository.UserRepository;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.RoomException;
import com.cyber.escape.global.exception.UserException;

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
			.orElseThrow(() -> new UserException(ExceptionCodeSet.USER_NOT_FOUND)));
		RoomDto.StompResponse room = new RoomDto.StompResponse(hostSessionId);
		room.setHost(host);
		roomMap.put(roomUuid, room);

		log.info("createRoom UUID : {}", roomUuid);
		log.info("방이 map에 재대로 들어갔니? : {}", roomMap.get(roomUuid) != null);

		return room;
	}

	public RoomDto.StompResponse joinRoom(String roomUuid, String userUuid, String guestSessionId) {
		RoomDto.StompResponse room = getRoom(roomUuid);

		if (isRoomAvailableForGuest(room)) {
			UserDto.StompResponse guest = UserDto.StompResponse.from(
				userRepository.findUserByUuid(userUuid)
				.orElseThrow(() -> new UserException(ExceptionCodeSet.USER_NOT_FOUND)));

			room.joinGuest(guestSessionId, guest);
		}

		return room;
	}

	public RoomDto.StompResponse leaveRoom(String roomUuid, String sessionId) {
		RoomDto.StompResponse room = getRoom(roomUuid);

		if (room.getHostSessionUuid().equals(sessionId)) {
			// host인 경우 대기방 삭제
			roomMap.remove(roomUuid);
		} else if (room.getGuestSessionUuid() != null && room.getGuestSessionUuid().equals(sessionId)) {
			// guest인 경우 guest 정보 null 처리
			room.leaveGuest();

			return room;
		}

		// 방장 == null 인 정보를 전달하면, Client에서 자동강퇴 처리.
		return new RoomDto.StompResponse(null);
	}

	public RoomDto.StompResponse kickGuest(String roomUuid, String sessionUuid) {
		RoomDto.StompResponse room = getRoom(roomUuid);
		checkHost(sessionUuid, room.getHostSessionUuid());
		room.kickGuest();

		return room;
	}

	public RoomDto.StompResponse delegateHost(String roomUuid, String sessionUuid) {
		RoomDto.StompResponse room = getRoom(roomUuid);
		checkHost(sessionUuid, room.getHostSessionUuid());
		room.swapHost(getGuestSessionId(room));

		return room;
	}

	public RoomDto.StompResponse changeReadyStatus(String roomUuid, String sessionUuid) {
		RoomDto.StompResponse room = getRoom(roomUuid);
		room.changeReadyStatus(sessionUuid);

		return room;
	}

	public RoomDto.StompResponse updateProgress(String roomUuid, String sessionUuid) {
		RoomDto.StompResponse room = getRoom(roomUuid);
		room.updateProgress(sessionUuid);

		return room;
	}

	public RoomDto.StompResponse resetStatus(String roomUuid) {
		RoomDto.StompResponse room = getRoom(roomUuid);
		room.resetStatus();

		return room;
	}

	private RoomDto.StompResponse getRoom(String roomUuid) {
		log.info("찾으려는 대기방 UUID : {}", roomUuid);
		log.info("map size : {}", roomMap.size());

		RoomDto.StompResponse room = roomMap.get(roomUuid);

		if(room == null){
			throw new RoomException(ExceptionCodeSet.ROOM_NOT_FOUND);
		}

		return room;
	}

	private void checkHost(String sessionUuid, String hostSessionUuid) {
		if(!sessionUuid.equals(hostSessionUuid)) {
			throw new RoomException(ExceptionCodeSet.ROOM_NOT_HOST);
		}
	}

	private boolean isRoomAvailableForGuest(RoomDto.StompResponse room) {
		if(room.getGuestSessionUuid() == null){
			return true;
		}

		throw new RoomException(ExceptionCodeSet.ROOM_CAPACITY_OVER);
	}

	private String getGuestSessionId(RoomDto.StompResponse room) {
		if (room.getGuestSessionUuid() != null) {
			return room.getGuestSessionUuid();
		} else {
			throw new RoomException(ExceptionCodeSet.ROOM_GUEST_NOT_FOUND);
		}
	}
}
