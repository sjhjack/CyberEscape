package com.cyber.escape.domain.room.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.cyber.escape.domain.room.dto.RoomDto;
import com.cyber.escape.domain.room.entity.Room;
import com.cyber.escape.domain.room.repository.RoomRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomServiceImpl {
	private final RoomRepository roomRepository;

	public List<RoomDto.Response> findAllRooms(){
		return roomRepository.findAllRooms().stream()
			.map(RoomDto.Response::from)
			.collect(Collectors.toList());
	}

	public void deleteRoom(String uuid){
		roomRepository.deleteRoomByUuid(uuid);
		// 연결된 채팅방까지 삭제 ???
	}

	public void inviteUserToRoom(RoomDto.Request request){
		// 알림 전송 및 MongoDB에 저장
		// 이 부분에 알림 send 메소드 넣으면 끝
	}

	public void acceptInvitation(RoomDto.Request request){
		// broadcasting 공부 후 개발
	}

	public void joinRoom(RoomDto.Request request){
		// broadcasting 공부 후 개발
	}

	public void exitRoom(RoomDto.Request request){
		// host, guest 분기 필요

		// host : 연결 끊고, 방 폭파
		// guest : 연결 끊기

		Room room = roomRepository.findRoomByUuid(RoomDto.Request request);

		if(request.getRoomUuid().equals(room.getUuid())){
			log.info("RoomServiceImpl ========== 방장입니다.");
			roomRepository.deleteRoomByUuid(room.getUuid());
			log.info("RoomServiceImpl ========== 방 삭제 성공");
		} else {
			log.info("RoomServiceImpl ========== 게스트입니다.");
		}
	}
}
