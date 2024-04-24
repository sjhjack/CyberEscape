package com.cyber.escape.domain.room.service;

import com.cyber.escape.domain.room.dto.RoomDto;
import com.cyber.escape.domain.user.dto.UserDto;

public interface RoomUpdateService {
	RoomDto.InfoResponse changeRoomSetting(RoomDto.InfoRequest infoRequest);
	UserDto.Response changeHost(RoomDto.Request request);
}
