package com.cyber.escape.domain.room.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cyber.escape.domain.room.service.RoomReadService;
import com.cyber.escape.domain.room.service.RoomUpdateService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class RoomController {
	private final RoomReadService roomReadService;
	private final RoomUpdateService roomUpdateService;

	@GetMapping
	public ResponseEntity<?> get() {
		roomReadService.findAllRooms();
		return null;
	}

	@PatchMapping
	public ResponseEntity<?> post() {
		// roomUpdateService.changeRoomSetting();

		return null;
	}
}
