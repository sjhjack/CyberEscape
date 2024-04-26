package com.cyber.escape.domain.room.service;

import com.cyber.escape.domain.room.dto.RoomDto;

public interface RoomDeleteService {
	void deleteRoom(final RoomDto.Request request);
}
