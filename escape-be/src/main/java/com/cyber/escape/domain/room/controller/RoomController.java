package com.cyber.escape.domain.room.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cyber.escape.domain.room.dto.PagingDto;
import com.cyber.escape.domain.room.dto.RoomDto;
import com.cyber.escape.domain.room.service.RoomCreateService;
import com.cyber.escape.domain.room.service.RoomDeleteService;
import com.cyber.escape.domain.room.service.RoomReadService;
import com.cyber.escape.domain.room.service.RoomUpdateService;
import com.cyber.escape.domain.user.dto.UserDto;
import com.cyber.escape.global.common.dto.ApiResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/room")
public class RoomController {
	private final RoomCreateService roomCreateService;
	private final RoomReadService roomReadService;
	private final RoomUpdateService roomUpdateService;
	private final RoomDeleteService roomDeleteService;

	// @GetMapping
	// public ApiResponse<List<RoomDto.Response>> findAllRooms() {
	// 	return new ApiResponse<>(HttpStatus.OK.value(), "대기실 전체 리스트를 가져왔습니다.", roomReadService.findAllRooms());
	// }

	@GetMapping
	public ApiResponse<PagingDto.Response<PagingDto.PageResponse>> findAllRooms(PagingDto.PageRequest pageRequest) {
		return new ApiResponse<>(HttpStatus.OK.value(), "대기실 전체 리스트를 가져왔습니다.", roomReadService.findAllRooms(pageRequest));
	}

	@PostMapping
	public ApiResponse<RoomDto.PostResponse> createRoom(RoomDto.PostRequest postRequest) {
		return new ApiResponse<>(HttpStatus.OK.value(), "대기실 생성 완료", roomCreateService.createRoom(postRequest));
	}

	@DeleteMapping
	public ApiResponse<String> deleteRoom(RoomDto.Request request) {
		roomDeleteService.deleteRoom(request);
		return new ApiResponse<>(HttpStatus.OK.value(), "대기실 삭제 완료", "");
	}

	@PatchMapping("/setting")
	public ApiResponse<RoomDto.InfoResponse> changeRoomSetting(RoomDto.InfoRequest infoRequest) {
		return new ApiResponse<>(HttpStatus.OK.value(), "대기실 설정 변경 성공", roomUpdateService.changeRoomSetting(infoRequest));
	}

	@PatchMapping("/change/host")
	public ApiResponse<UserDto.Response> changeHost(RoomDto.Request request) {
		return new ApiResponse<>(HttpStatus.OK.value(), "대기실 방장 변경 성공", roomUpdateService.changeHost(request));
	}

	@PatchMapping("/start")
	public ApiResponse<RoomDto.TimeResponse> setStartTime(RoomDto.TimeRequest timeRequest) {
		return new ApiResponse<>(HttpStatus.OK.value(), "대기실 게임 시작 시간 저장 성공", roomUpdateService.setStartTime(timeRequest));
	}
}
