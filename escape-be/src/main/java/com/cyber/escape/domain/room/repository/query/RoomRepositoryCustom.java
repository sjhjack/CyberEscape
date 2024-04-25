package com.cyber.escape.domain.room.repository.query;

import java.util.List;

import com.cyber.escape.domain.room.dto.PagingDto;

public interface RoomRepositoryCustom {
	// QueryDSL 사용

	List<PagingDto.PageResponse> findAllRooms(PagingDto.PageRequest pageRequest);
}
