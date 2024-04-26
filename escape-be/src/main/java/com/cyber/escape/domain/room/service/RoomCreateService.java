package com.cyber.escape.domain.room.service;

import com.cyber.escape.domain.room.dto.RoomDto;

public interface RoomCreateService {
	RoomDto.PostResponse createRoom(RoomDto.PostRequest postRequest);
}
