package com.cyber.escape.domain.room.service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cyber.escape.domain.room.data.RoomUpdateSetting;
import com.cyber.escape.domain.room.dto.Pagination;
import com.cyber.escape.domain.room.dto.PagingDto;
import com.cyber.escape.domain.room.dto.RoomDto;
import com.cyber.escape.domain.room.entity.Room;
import com.cyber.escape.domain.room.repository.RoomRepository;
import com.cyber.escape.domain.room.utils.RoomServiceUtils;
import com.cyber.escape.domain.user.dto.UserDto;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
@Slf4j
public class RoomServiceImpl implements RoomReadService, RoomUpdateService {
	private final RoomRepository roomRepository;
	private final UserRepository userRepository;

	@Override
	public PagingDto.Response<PagingDto.PageResponse> findAllRooms(PagingDto.PageRequest pageRequest) {
		// Todo : 4개씩 페이지네이션

		int totalRecordCount = (int)roomRepository.count();
		if (totalRecordCount < 1) {
			return new PagingDto.Response<>(Collections.emptyList(), null);
		}

		// Pagination 객체를 생성해서 페이지 정보 계산 후 SearchDto 타입의 객체인 params에 계산된 페이지 정보 저장
		Pagination pagination = new Pagination(totalRecordCount, pageRequest);
		pageRequest.setPagination(pagination);

		// 계산된 페이지 정보의 일부(limitStart, recordSize)를 기준으로 리스트 데이터 조회 후 응답 데이터 반환
		List<PagingDto.PageResponse> list = roomRepository.findAllRooms(pageRequest);
		return new PagingDto.Response<>(list, pagination);

		// return roomRepository.findAll().stream()
		// 	.map(RoomDto.Response::from)
		// 	.collect(Collectors.toList());
	}

	@Transactional
	public void deleteRoom(final String uuid) {
		Room findRoom = RoomServiceUtils.findByUuid(roomRepository, uuid);

		roomRepository.delete(findRoom);
		// roomRepository.deleteRoomByUuid(uuid);
		// 연결된 채팅방까지 삭제 ???
	}

	public void inviteUserToRoom(final RoomDto.Request request) {
		// 알림 전송 및 MongoDB에 저장
		// 이 부분에 알림 send 메소드 넣으면 끝
	}

	public void acceptInvitation(final RoomDto.Request request) {
		// broadcasting 공부 후 개발
		// 비밀번호 check 필요
	}

	public void joinRoom(final RoomDto.Request request) {
		// broadcasting 공부 후 개발
		// 비밀번호 check 필요
		// 없으면 바로 입장 가능
		// 있으면 ..? 비밀번호 입력하라고 다시 돌려보내? ㅋㅋㅋ;
	}

	public void exitRoom(final RoomDto.Request request) {
		// host, guest 분기 필요

		// host : 연결 끊고, 방 폭파
		// guest : 연결 끊기

		// 연결 끊기는 front에서 하는 건가?

		Room findRoom = RoomServiceUtils.findByUuid(roomRepository, request.getRoomUuid());

		User user = userRepository.findUserByUuid(request.getUserUuid())
			.orElseThrow(() -> new RuntimeException("일치하는 사용자가 없습니다."));

		if (user.getId() == findRoom.getHost().getId()) {
			log.info("RoomServiceImpl ========== 방장입니다.");
			roomRepository.deleteRoomByUuid(findRoom.getUuid());
			log.info("RoomServiceImpl ========== 방 삭제 성공");
		} else {
			log.info("RoomServiceImpl ========== 게스트입니다.");
		}
	}

	public void kickGuestFromRoom(final RoomDto.Request request) {
		// host인 경우만 강퇴 가능 -> validation check 필요

		Room findRoom = RoomServiceUtils.findByUuid(roomRepository, request.getRoomUuid());

		User user = userRepository.findUserByUuid(request.getUserUuid())
			.orElseThrow(() -> new RuntimeException("일치하는 사용자가 없습니다."));

		if (user.getId() == findRoom.getHostId()) {
			log.info("RoomServiceImpl ========== 방장입니다.");
			// DB에 저장을 안 하면 강퇴는 어떻게 하지? 연결을 서버에서 끊어버려? 이게 되나?
		} else {
			throw new RuntimeException("방장이 아닙니다.");
		}
	}

	@Transactional
	@Override
	public RoomDto.InfoResponse changeRoomSetting(final RoomDto.InfoRequest infoRequest) {
		Room findRoom = RoomServiceUtils.findByUuid(roomRepository, infoRequest.getRoomUuid());

		// Todo : 비밀번호 암호화
		findRoom.updateSetting(RoomUpdateSetting.of(infoRequest.getTitle(), infoRequest.getPassword()));
		// roomRepositoryImpl.changeRoomSetting(infoRequest);

		return RoomDto.InfoResponse.from(findRoom);
	}

	@Transactional
	@Override
	public UserDto.Response changeHost(final RoomDto.Request request) {
		// host인 경우만 변경 가능 -> validation check 필요

		// Room room = roomRepository.findRoomByUuid(request.getRoomUuid())
		// 	.orElseThrow(() -> new RuntimeException("일치하는 대기방이 없습니다."));
		Room findRoom = RoomServiceUtils.findByUuid(roomRepository, request.getRoomUuid());

		// Todo : Context Holder에 저장된 UserUuid 값으로 방장 여부 확인
		// User user = userRepository.findUserByUuid(UserUtil.getUserUuid())
		// 	.orElseThrow(() -> new RuntimeException("일치하는 사용자가 없습니다."));

		// if(user.getId() == room.getHost().getId()){
		// 	log.info("RoomServiceImpl ========== 방장입니다.");
		// 	// 여기다가 로직 옮기기
		// } else {
		// 	throw new RuntimeException("방장이 아닙니다.");
		// }

		// 근데 여기랑 room 가져오는 코드가 겹치는데 좋은 방법이 없을까?
		// utils로 리펙토링하고, 아래 코드 impl코드 삭제하면서 해결
		// roomRepositoryImpl.changeHost(request);

		User host = userRepository.findUserByUuid(request.getUserUuid())
			.orElseThrow(() -> new EntityNotFoundException("일치하는 사용자가 없습니다."));

		findRoom.setHost(host);

		return UserDto.Response.from(host);
	}

	@Transactional
	@Override
	public RoomDto.TimeResponse setStartTime(final RoomDto.TimeRequest timeRequest) {
		Room findRoom = RoomServiceUtils.findByUuid(roomRepository, timeRequest.getRoomUuid());

		findRoom.setStartedAt(timeRequest.getStartedAt());

		return RoomDto.TimeResponse.from(findRoom);
	}
}
