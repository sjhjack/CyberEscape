package com.cyber.escape.domain.room.service.impl;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cyber.escape.domain.notification.document.Notify;
import com.cyber.escape.domain.notification.service.NotificationService;
import com.cyber.escape.domain.room.data.RoomUpdateSetting;
import com.cyber.escape.domain.room.dto.MatchUser;
import com.cyber.escape.domain.room.dto.Pagination;
import com.cyber.escape.domain.room.dto.PagingDto;
import com.cyber.escape.domain.room.dto.RoomDto;
import com.cyber.escape.domain.room.entity.Room;
import com.cyber.escape.domain.room.repository.RoomRepository;
import com.cyber.escape.domain.room.service.RoomService;
import com.cyber.escape.domain.room.utils.RoomServiceUtils;
import com.cyber.escape.domain.thema.entity.Thema;
import com.cyber.escape.domain.thema.repository.ThemaRepository;
import com.cyber.escape.domain.user.dto.UserDto;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;
import com.cyber.escape.domain.user.util.UserUtil;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.RoomException;
import com.cyber.escape.global.exception.UserException;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
@Slf4j
public class RoomServiceImpl implements RoomService {
	private static final int[] categories = {1, 4};

	private final UserRepository userRepository;
	private final RoomRepository roomRepository;
	private final ThemaRepository themaRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;	// security의 암호화 라이브러리
	private final NotificationService notificationService;
	private final UserUtil userUtil;
	private final RedisTemplate<String, MatchUser> redisTemplate;
	private final SimpMessagingTemplate messagingTemplate;

	@Value("${room.matching-key}")
	private String MATCHING_QUEUE_KEY;

	@Transactional
	public void addPlayerToMatchingQueue(String userUuid, String principalUuid) {
		log.info("매칭 등록 시작!!");
		log.info("매칭 쓰레드 : {}", Thread.currentThread().getName());
		
		ListOperations<String, MatchUser> listOperations = redisTemplate.opsForList();

		log.info("Current Matching Queue size : {}", listOperations.size(MATCHING_QUEUE_KEY));
		log.info("SessionUuid for matching : {}", principalUuid);

		// listOperations.rightPush(MATCHING_QUEUE_KEY, new MatchUser(principalUuid, userUtil.getLoginUserUuid()));
		listOperations.rightPush(MATCHING_QUEUE_KEY, new MatchUser(principalUuid, userUuid));

		log.info("After Matching Queue size : {}", listOperations.size(MATCHING_QUEUE_KEY));
	}

	@Scheduled(fixedDelay = 1000) // 1초마다 실행
	@Transactional
	public void matchPlayers() {
		ListOperations<String, MatchUser> listOperations = redisTemplate.opsForList();

		if(listOperations.size(MATCHING_QUEUE_KEY) >= 2) {
			log.info("매칭 성공 !!");
			log.info("listOperations size before matching : {}", listOperations.size(MATCHING_QUEUE_KEY));

			MatchUser user1 = listOperations.leftPop(MATCHING_QUEUE_KEY);
			MatchUser user2 = listOperations.leftPop(MATCHING_QUEUE_KEY);

			log.info("user1Uuid : {}", user1.getUserUuid());
			log.info("user2Uuid : {}", user2.getUserUuid());
			log.info("listOperations size after matching : {}", listOperations.size(MATCHING_QUEUE_KEY));

			User host = userRepository.findUserByUuid(user1.getUserUuid())
				.orElseThrow(() -> new UserException(ExceptionCodeSet.USER_NOT_FOUND));
			int randomIndex = (int) (Math.random() * (categories.length - 1));
			int category = categories[randomIndex];

			RoomDto.PostRequest postRequest = RoomDto.PostRequest.builder()
				.title(host.getNickname() + "의 대기실")
				.category(category)
				.password("")
				.hostUuid(user1.getUserUuid())
				.build();

			RoomDto.PostResponse createdRoom = createRoom(postRequest, 2);

			// 매칭된 플레이어들에게 대기방 정보 전송
			sendMatchResultToUser(user1, createdRoom);
			sendMatchResultToUser(user2, createdRoom);
		}
	}

	// @Async
	// public void sendMatchResultToUser(MatchUser matchUser, RoomDto.PostResponse createdRoom) {
	// 	try {
	// 		log.info("매칭 정보 전송 쓰레드 : {}", Thread.currentThread().getName());
	// 		messagingTemplate.convertAndSend("/queue/match" + matchUser.getUserUuid(), createdRoom);
	// 		log.info("매칭 정보 전송 할 Client의 session Uuid: {}", matchUser.getPrincipalUuid());
	// 	} catch (Exception e) {
	// 		log.error("Failed to send match result to user: {}", matchUser.getPrincipalUuid(), e);
	// 		// 실패한 경우 재시도 로직 추가
	// 		retryMatchResultSend(matchUser, createdRoom, 3); // 최대 3번 재시도
	// 	}
	// }

	@Async
	public void sendMatchResultToUser(MatchUser matchUser, RoomDto.PostResponse createdRoom) {
		try {
			log.info("매칭 정보 전송 쓰레드 : {}", Thread.currentThread().getName());
			log.info("매칭 정보 전송 할 Client의 session Uuid: {}", matchUser.getPrincipalUuid());
			messagingTemplate.convertAndSendToUser(matchUser.getPrincipalUuid(), "/queue/match", createdRoom);
		} catch (Exception e) {
			log.error("Failed to send match result to user: {}", matchUser.getPrincipalUuid(), e);
			// 실패한 경우 재시도 로직 추가
			retryMatchResultSend(matchUser, createdRoom, 3); // 최대 3번 재시도
		}
	}

	private void retryMatchResultSend(MatchUser matchUser, RoomDto.PostResponse createdRoom, int retryCount) {
		if (retryCount <= 0) {
			log.error("Failed to send match result after retries for user: {}", matchUser.getUserUuid());
			return;
		}

		try {
			messagingTemplate.convertAndSendToUser(matchUser.getPrincipalUuid(), "/queue/match", createdRoom);
			log.info("Retry successful for user: {}", matchUser.getPrincipalUuid());
		} catch (Exception e) {
			log.error("Retry failed for user: {}", matchUser.getPrincipalUuid(), e);
			retryMatchResultSend(matchUser, createdRoom, retryCount - 1);
		}
	}


	@Override
	public PagingDto.Response findAllRoomsByKeyword(PagingDto.PageRequest pageRequest) {
		log.info("keyword : {}", pageRequest.getKeyword());
		// 4개씩 페이지네이션
		int totalRecordCount = (int)roomRepository.countAllByTitleLike(pageRequest.getKeyword());

		log.info("totalRecordCount = {}", totalRecordCount);

		if (totalRecordCount < 1) {
			return PagingDto.Response.of(Collections.emptyList(), null);
		}

		// Pagination 객체를 생성해서 페이지 정보 계산 후 SearchDto 타입의 객체인 params에 계산된 페이지 정보 저장
		Pagination pagination = new Pagination(totalRecordCount, pageRequest);
		pageRequest.setPagination(pagination);

		// 계산된 페이지 정보의 일부(limitStart, recordSize)를 기준으로 리스트 데이터 조회 후 응답 데이터 반환
		List<PagingDto.PageResponse> list = roomRepository.findAllRooms(pageRequest);
		return PagingDto.Response.of(list, pagination);
	}

	@Transactional
	@Override
	public RoomDto.PostResponse createRoom(RoomDto.PostRequest postRequest, int capacity) {
		log.info("방 생성 시작!!");

		User host = null;
		if(capacity == 1) {
			host = userUtil.getLoginUser();
		} else {
			host = userRepository.findUserByUuid(postRequest.getHostUuid())
				.orElseThrow(() -> new UserException(ExceptionCodeSet.USER_NOT_FOUND));
		}

		log.info("hostUuid : {}, category : {}", host.getUuid(), postRequest.getCategory());

		Thema thema = themaRepository.findByCategory(postRequest.getCategory())
			.orElseThrow(() -> new EntityNotFoundException("일치하는 테마가 없습니다."));
		
		Room newRoom = Room.of(postRequest.getTitle(), 1, host, thema);
		log.info("req room raw password : {}", postRequest.getPassword());

		if(!postRequest.getPassword().isEmpty()) {
			log.info("password 있어용 ㅎㅎ");
			String encryptPassword = bCryptPasswordEncoder.encode(postRequest.getPassword());
			newRoom.setPassword(encryptPassword);
		}

		newRoom = roomRepository.save(newRoom);
		log.info("new room uuid : {}", newRoom.getUuid());
		log.info("new room password : {}", newRoom.getPassword());
		log.info("created room title : {}, hasPassword : {}", newRoom.getTitle(), newRoom.isHasPassword());

		return RoomDto.PostResponse.of(newRoom.getTitle(), newRoom.getUuid(), newRoom.getHostUuid(), thema.getCategory());
	}

	@Transactional
	@Override
	public RoomDto.PostResponse createRoom(RoomDto.PostRequest postRequest) {
		return createRoom(postRequest, 1);
	}

	@Transactional
	@Override
	public String deleteRoom(final RoomDto.Request request) {
		// 이거 근데 왜 필요한거지?
		// 방장이 나갔을 때 말고는 삭제할 일이 없는거 아닌가?

		Room findRoom = RoomServiceUtils.findByUuid(roomRepository, request.getRoomUuid());
		User findUser = userUtil.getLoginUser();

		if(checkHost(findUser.getId(), findRoom.getHostId())){
			roomRepository.delete(findRoom);
		} else {
			throw new RuntimeException("방장이 아닙니다.");
		}

		return "";
	}

	public String inviteUserToRoom(final RoomDto.Request request) {
		// 알림 전송 및 MongoDB에 저장
		// 이 부분에 알림 send 메소드 넣으면 끝
		log.info("request userUuid : {}, roomUuid : {}", request.getUserUuid(), request.getRoomUuid());
		notificationService.send(request.getUserUuid(), request.getRoomUuid(), Notify.NotificationType.GAME, "게임 요청입니다.");
		return "";
	}

	@Transactional
	public RoomDto.AcceptResponse acceptInvitation(final RoomDto.Request acceptRequest) {
		Room findRoom = RoomServiceUtils.findByUuid(roomRepository, acceptRequest.getRoomUuid());

		checkJoinRoomValidation(findRoom, "", true);
		findRoom.setCapacity(2);

		return RoomDto.AcceptResponse.from(findRoom);
	}

	@Transactional
	public String joinRoom(final RoomDto.JoinRequest joinRequest) {
		Room findRoom = RoomServiceUtils.findByUuid(roomRepository, joinRequest.getRoomUuid());

		checkJoinRoomValidation(findRoom, joinRequest.getPassword(), false);
		findRoom.setCapacity(2);

		return findRoom.getUuid();
	}

	private void checkJoinRoomValidation(Room findRoom, String password, Boolean isInvited) {
		// 비밀번호 불일치
		if(findRoom.getCapacity() >= 2) {
			throw new RoomException(ExceptionCodeSet.ROOM_CAPACITY_OVER);
		}

		// 초대로 받은 거면 패스워드 검사는 따로 하지 않는다.
		if(isInvited) return;

		if(findRoom.getPassword() != null) {
			if(!bCryptPasswordEncoder.matches(password, findRoom.getPassword())){
				throw new RoomException(ExceptionCodeSet.ROOM_PASSWORD_MISMATCH);
			}
		}
		// 정원 초과

	}

	@Transactional
	public String exitRoom(final RoomDto.Request request) {
		// host : 방 삭제 (소켓 : 연결 끊고, 방 폭파)
		// guest : capacity 변경 (소켓 : 연결 끊기)

		Room findRoom = RoomServiceUtils.findByUuid(roomRepository, request.getRoomUuid());
		User user = userUtil.getLoginUser();

		if (checkHost(user.getId(), findRoom.getHostId())) {
			log.info("RoomServiceImpl ========== 방장입니다.");
			roomRepository.delete(findRoom);
			log.info("RoomServiceImpl ========== 방 삭제 성공");
		} else {
			log.info("RoomServiceImpl ========== 게스트입니다.");
			// capacity 변경
			findRoom.setCapacity(1);
		}

		return "";
	}

	@Transactional
	public String kickGuestFromRoom(final RoomDto.KickRequest kickRequest) {
		// host인 경우만 강퇴 가능 -> validation check 필요

		Room findRoom = RoomServiceUtils.findByUuid(roomRepository, kickRequest.getRoomUuid());
		User host = userUtil.getLoginUser();

		if (checkHost(host.getId(), findRoom.getHostId())) {
			log.info("RoomServiceImpl ========== 방장입니다.");
			// capacity 변경
			findRoom.setCapacity(1);
		} else {
			throw new RoomException(ExceptionCodeSet.ROOM_NOT_HOST);
		}

		return "";
	}

	@Transactional
	@Override
	public RoomDto.InfoResponse changeRoomSetting(final RoomDto.InfoRequest infoRequest) {
		Room findRoom = RoomServiceUtils.findByUuid(roomRepository, infoRequest.getRoomUuid());

		String encryptPassword = bCryptPasswordEncoder.encode(infoRequest.getPassword());
		findRoom.updateSetting(RoomUpdateSetting.of(infoRequest.getTitle(), encryptPassword));

		return RoomDto.InfoResponse.from(findRoom);
	}

	@Transactional
	@Override
	public UserDto.Response changeHost(final RoomDto.Request request) {
		// host인 경우만 변경 가능 -> validation check 필요
		Room findRoom = RoomServiceUtils.findByUuid(roomRepository, request.getRoomUuid());
		User host = userUtil.getLoginUser();

		if(checkHost(host.getId(), findRoom.getHostId())){
			log.info("RoomServiceImpl ========== 방장입니다.");

			User guest = userRepository.findUserByUuid(request.getUserUuid())
				.orElseThrow(() -> new EntityNotFoundException("일치하는 사용자가 없습니다."));

			findRoom.setUpdator(findRoom.getHost());
			findRoom.setHost(guest);

			return UserDto.Response.from(guest);
		} else {
			throw new RoomException(ExceptionCodeSet.ROOM_NOT_HOST);
		}
	}

	@Transactional
	@Override
	public RoomDto.TimeResponse setStartTime(final RoomDto.TimeRequest timeRequest) {
		Room findRoom = RoomServiceUtils.findByUuid(roomRepository, timeRequest.getRoomUuid());

		findRoom.setStartedAt(timeRequest.getStartedAt());
		findRoom.setUpdator(findRoom.getHost());

		return RoomDto.TimeResponse.from(findRoom);
	}

	private boolean checkHost(Long userId, Long roomHostId) {
		return userId.equals(roomHostId);
	}
}
