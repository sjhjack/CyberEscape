package com.cyber.escape.domain.room.service;

import java.util.Collections;
import java.util.List;

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
import com.cyber.escape.domain.room.utils.RoomServiceUtils;
import com.cyber.escape.domain.thema.entity.Thema;
import com.cyber.escape.domain.thema.repository.ThemaRepository;
import com.cyber.escape.domain.user.dto.UserDto;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;
import com.cyber.escape.domain.user.util.UserUtil;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.UserException;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
@Slf4j
public class RoomServiceImpl implements RoomService {
	private static final String MATCHING_QUEUE_KEY = "matching_queue";
	private static final Long[] themaIds = {1L, 2L, 3L};	// Todo : 값 변경
	private final UserRepository userRepository;
	private final RoomRepository roomRepository;
	private final ThemaRepository themaRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;	// security의 암호화 라이브러리
	private final NotificationService notificationService;
	private final UserUtil userUtil;
	private final RedisTemplate<String, MatchUser> redisTemplate;
	private final SimpMessagingTemplate messagingTemplate;

	@Transactional
	public void addPlayerToMatchingQueue(String principalUuid) {
		ListOperations<String, MatchUser> listOperations = redisTemplate.opsForList();
		listOperations.rightPush(MATCHING_QUEUE_KEY, new MatchUser(principalUuid, userUtil.getLoginUserUuid()));
		log.info("listOperations size : {}", listOperations.size(MATCHING_QUEUE_KEY));
	}

	@Scheduled(fixedDelay = 1000) // 1초마다 실행
	@Transactional
	public void matchPlayers() {
		ListOperations<String, MatchUser> listOperations = redisTemplate.opsForList();

		if(listOperations.size(MATCHING_QUEUE_KEY) >= 2) {
			MatchUser user1 = listOperations.leftPop(MATCHING_QUEUE_KEY);
			MatchUser user2 = listOperations.leftPop(MATCHING_QUEUE_KEY);

			log.info("user1Uuid : {}", user1.getUserUuid());
			log.info("user2Uuid : {}", user2.getUserUuid());
			log.info("listOperations size after matching : {}", listOperations.size(MATCHING_QUEUE_KEY));

			User host = userRepository.findUserByUuid(user1.getUserUuid())
				.orElseThrow(() -> new UserException(ExceptionCodeSet.USER_NOT_FOUND));
			int randomIndex = (int) (Math.random() * (themaIds.length - 1));
			Long themaId = themaIds[randomIndex];

			RoomDto.PostRequest postRequest = RoomDto.PostRequest.builder()
				.title(host.getNickname() + "의 대기실")
				.themaId(themaId)
				.password("")
				.hostUuid(user1.getUserUuid())
				.build();

			RoomDto.PostResponse createdRoom = createRoom(postRequest, 2);

			// 매칭된 플레이어들에게 대기방 정보 전송
			sendMatchResultToUser(user1, createdRoom);
			sendMatchResultToUser(user2, createdRoom);
		}
	}

	@Async
	public void sendMatchResultToUser(MatchUser matchUser, RoomDto.PostResponse createdRoom) {
		try {
			messagingTemplate.convertAndSendToUser(matchUser.getPrincipalUuid(), "/queue/match", createdRoom);
			log.info("매칭 정보 전송 할 Client의 session Uuid: {}", matchUser.getPrincipalUuid());
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
		String encryptPassword = bCryptPasswordEncoder.encode(postRequest.getPassword());

		User host = userUtil.getLoginUser();
		// User host = userRepository.findUserByUuid(postRequest.getHostUuid())
		// 	.orElseThrow(() -> new EntityNotFoundException("존재하지 않는 회원입니다."));
		log.info("hostUuid : {}", host.getUuid());

		Thema thema = themaRepository.findById(postRequest.getThemaId())
			.orElseThrow(() -> new EntityNotFoundException("일치하는 테마가 없습니다."));

		Room newRoom = Room.builder()
			.title(postRequest.getTitle())
			// .password(postRequest.getPassword())
			.password(encryptPassword)
			.capacity(capacity)
			.thema(thema)
			.host(host)
			.creator(host)
			.updator(host)
			.build();

		newRoom = roomRepository.save(newRoom);

		// Todo : 채팅방 생성해서 저장하고 채팅방 Uuid 가져오기

		return RoomDto.PostResponse.of(newRoom.getUuid(), "chatRoomuuid");
	}

	@Transactional
	@Override
	public RoomDto.PostResponse createRoom(RoomDto.PostRequest postRequest) {
		return createRoom(postRequest, 1);
	}

	@Transactional
	@Override
	public void deleteRoom(final RoomDto.Request request) {
		// 이거 근데 왜 필요한거지?
		// 방장이 나갔을 때 말고는 삭제할 일이 없는거 아닌가?

		Room findRoom = RoomServiceUtils.findByUuid(roomRepository, request.getRoomUuid());
		User findUser = userUtil.getLoginUser();

		if(findUser.getId() == findRoom.getHostId()){
			roomRepository.delete(findRoom);
			// Todo : 연결된 채팅방까지 삭제 ???
			// Todo : 방에 남아있는 Guest는 추방 조치

		} else {
			throw new RuntimeException("방장이 아닙니다.");
		}
	}

	public String inviteUserToRoom(final RoomDto.Request request) {
		// 알림 전송 및 MongoDB에 저장
		// 이 부분에 알림 send 메소드 넣으면 끝
		notificationService.send(request.getUserUuid(), request.getRoomUuid(), Notify.NotificationType.GAME, "게임 요청입니다.");
		return "";
	}

	public void acceptInvitation(final RoomDto.Request request) {
		// Todo : broadcasting 공부 후 개발
		// 비밀번호 check 필요
		
		// 이것도 필요 없을 것 같은데? joinRoom()으로 퉁치면 되잖아
		// Todo : capacity 변경
	}

	@Transactional
	public void joinRoom(final RoomDto.JoinRequest joinRequest) {
		// Todo : broadcasting 공부 후 입장 처리 개발

		Room findRoom = RoomServiceUtils.findByUuid(roomRepository, joinRequest.getRoomUuid());

		if(findRoom.getPassword() != null){
			// Todo : Security 적용 후 주석 해제
			// 비밀번호 check
			if(bCryptPasswordEncoder.matches(joinRequest.getPassword(), findRoom.getPassword())){
				findRoom.setCapacity(2);
			} else {
				throw new RuntimeException("비밀번호가 일치하지 않습니다.");
			}
		} else {
			findRoom.setCapacity(2);
		}
	}

	@Transactional
	public void exitRoom(final RoomDto.Request request) {
		// Todo : broadcasting 공부 후 퇴장 및 자동강퇴 처리 개발
		// host, guest 분기 필요

		// host : 연결 끊고, 방 폭파
		// guest : 연결 끊기

		// 연결 끊기는 front에서 하는 건가?

		Room findRoom = RoomServiceUtils.findByUuid(roomRepository, request.getRoomUuid());

		User user = userUtil.getLoginUser();

		if (user.getId() == findRoom.getHostId()) {
			log.info("RoomServiceImpl ========== 방장입니다.");
			roomRepository.delete(findRoom);
			// Todo : 연결된 채팅방까지 삭제 ???
			// Todo : 방에 남아있는 Guest는 자동강퇴 조치
			log.info("RoomServiceImpl ========== 방 삭제 성공");
		} else {
			log.info("RoomServiceImpl ========== 게스트입니다.");
			// capacity 변경
			findRoom.setCapacity(1);
		}
	}

	@Transactional
	public void kickGuestFromRoom(final RoomDto.Request request) {
		// Todo : broadcasting 공부 후 강퇴 개발
		// host인 경우만 강퇴 가능 -> validation check 필요

		Room findRoom = RoomServiceUtils.findByUuid(roomRepository, request.getRoomUuid());
		User host = userUtil.getLoginUser();

		if (host.getId() == findRoom.getHostId()) {
			log.info("RoomServiceImpl ========== 방장입니다.");
			// Todo : 강퇴..
			// DB에 저장을 안 하면 강퇴는 어떻게 하지? 연결을 서버에서 끊어버려? 이게 되나?
			// capacity 변경
			findRoom.setCapacity(1);
		} else {
			throw new RuntimeException("방장이 아닙니다.");
		}
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

		if(host.getId() == findRoom.getHostId()){
			log.info("RoomServiceImpl ========== 방장입니다.");

			User guest = userRepository.findUserByUuid(request.getUserUuid())
				.orElseThrow(() -> new EntityNotFoundException("일치하는 사용자가 없습니다."));

			findRoom.setUpdator(findRoom.getHost());
			findRoom.setHost(guest);

			return UserDto.Response.from(guest);
		} else {
			throw new RuntimeException("방장이 아닙니다.");
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
}
