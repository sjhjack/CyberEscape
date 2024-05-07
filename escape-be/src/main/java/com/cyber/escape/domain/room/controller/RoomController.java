package com.cyber.escape.domain.room.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cyber.escape.domain.room.dto.PagingDto;
import com.cyber.escape.domain.room.dto.RoomDto;
import com.cyber.escape.domain.room.service.RoomModifyService;
import com.cyber.escape.domain.room.service.RoomReadService;
import com.cyber.escape.domain.user.dto.UserDto;
import com.cyber.escape.global.common.dto.ApiResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/room")
public class RoomController {
	private final RoomReadService roomReadService;
	private final RoomModifyService roomModifyService;

	/**
	 * keyword가 주어지지 않으면 전체 리스트를 반환합니다.
	 * keyword가 주어지면 like 연산을 통한 리스트를 반환합니다.
	 *
	 * @param pageRequest (page 번호, 검색할 제목)
	 * @return 대기실 정보 리스트
	 */
	@GetMapping
	public ApiResponse<PagingDto.Response> findAllRoomsByKeyword(@RequestBody PagingDto.PageRequest pageRequest) {
		return new ApiResponse<>(HttpStatus.OK.value(), "대기실 전체 리스트를 가져왔습니다.", roomReadService.findAllRoomsByKeyword(pageRequest));
	}

	@PostMapping
	public ApiResponse<RoomDto.PostResponse> createRoom(@RequestBody RoomDto.PostRequest postRequest) {
		return new ApiResponse<>(HttpStatus.OK.value(), "대기실 생성 완료", roomModifyService.createRoom(postRequest));
	}

	@DeleteMapping
	public ApiResponse<String> deleteRoom(@RequestBody RoomDto.Request request) {
		roomModifyService.deleteRoom(request);
		return new ApiResponse<>(HttpStatus.OK.value(), "대기실 삭제 완료", "");
	}

	@PatchMapping("/setting")
	public ApiResponse<RoomDto.InfoResponse> changeRoomSetting(@RequestBody RoomDto.InfoRequest infoRequest) {
		return new ApiResponse<>(HttpStatus.OK.value(), "대기실 설정 변경 성공", roomModifyService.changeRoomSetting(infoRequest));
	}

	@PatchMapping("/change/host")
	public ApiResponse<UserDto.Response> changeHost(@RequestBody RoomDto.Request request) {
		return new ApiResponse<>(HttpStatus.OK.value(), "대기실 방장 변경 성공", roomModifyService.changeHost(request));
	}

	@PatchMapping("/start")
	public ApiResponse<RoomDto.TimeResponse> setStartTime(@RequestBody RoomDto.TimeRequest timeRequest) {
		return new ApiResponse<>(HttpStatus.OK.value(), "대기실 게임 시작 시간 저장 성공", roomModifyService.setStartTime(timeRequest));
	}
}
