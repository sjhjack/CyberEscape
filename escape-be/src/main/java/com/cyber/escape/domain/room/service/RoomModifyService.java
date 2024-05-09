package com.cyber.escape.domain.room.service;

import com.cyber.escape.domain.room.dto.RoomDto;
import com.cyber.escape.domain.user.dto.UserDto;

public interface RoomModifyService {
	void addPlayerToMatchingQueue(String principalUuid);

	RoomDto.PostResponse createRoom(RoomDto.PostRequest postRequest);
	RoomDto.PostResponse createRoom(RoomDto.PostRequest postRequest, int capacity);


	RoomDto.InfoResponse changeRoomSetting(RoomDto.InfoRequest infoRequest);
	UserDto.Response changeHost(RoomDto.Request request);
	RoomDto.TimeResponse setStartTime(RoomDto.TimeRequest timeRequest);

	void deleteRoom(final RoomDto.Request request);
	String inviteUserToRoom(RoomDto.Request request);
}
