package com.cyber.escape.domain.room.service;

import com.cyber.escape.domain.room.dto.RoomDto;

public interface RoomUpdateService {
	void changeRoomSetting(RoomDto.InfoRequest infoRequest);
}
