package com.cyber.escape.domain.room.service;

import java.util.List;

import com.cyber.escape.domain.room.dto.PagingDto;
import com.cyber.escape.domain.room.dto.RoomDto;

public interface RoomReadService {
	PagingDto.Response findAllRoomsByKeyword(PagingDto.PageRequest pageRequest);
}
