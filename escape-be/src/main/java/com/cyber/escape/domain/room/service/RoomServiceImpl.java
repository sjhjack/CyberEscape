package com.cyber.escape.domain.room.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.cyber.escape.domain.room.dto.RoomDto;
import com.cyber.escape.domain.room.repository.RoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl {
	private final RoomRepository roomRepository;

	public List<RoomDto.Response> findAllRooms(){
		return roomRepository.findAllRooms().stream()
			.map(RoomDto.Response::from)
			.collect(Collectors.toList());
	}


}
