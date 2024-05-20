package com.cyber.escape.global.common.handler;

import java.security.Principal;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import com.cyber.escape.domain.auth.jwt.TokenProvider;
import com.cyber.escape.domain.room.dto.RoomDto;
import com.cyber.escape.domain.room.manager.RoomManager;
import com.cyber.escape.domain.room.service.RoomModifyService;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.TokenException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

// @Component
@RestController
@RequiredArgsConstructor
@Slf4j
public class RoomStompHandler {
	private final SimpMessageSendingOperations messagingTemplate;
	private final RoomManager roomManager;
	private final RoomModifyService roomModifyService;
	private final TokenProvider tokenProvider;
	private Map<String, String> sessionRoomMap = new ConcurrentHashMap<>();

	@EventListener
	public void handleWebSocketConnectListener(SessionConnectedEvent event) {
		log.info("ConnectListener === ");
		log.info("Connection event : {}", event.toString());
	}

	@EventListener
	public void handleWebSocketSubscribeListener(SessionSubscribeEvent event) {
		log.info("SubscribeListener === ");
		log.info("Subscribe event : {}", event.toString());

		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
		String subscribeDestination = headerAccessor.getDestination();
		String sessionUuid = headerAccessor.getSessionId();
		String bearerToken = headerAccessor.getFirstNativeHeader("Authorization");

		log.info("구독 경로 : {}", subscribeDestination);
		log.info("Session Uuid : {}", sessionUuid);

		if(subscribeDestination.startsWith("/topic/")) {
			String roomUuid = subscribeDestination.substring(7);
			handleRoomSubscription(roomUuid, sessionUuid);
			setAuthentication(bearerToken);
		}
	}

	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		log.info("DisconnectListener === sessionUuid : {}", event.getSessionId());
		handleDisconnectSession(event.getSessionId());
	}

	private void handleRoomSubscription(String roomUuid, String sessionUuid) {
		log.info("handleRoomSubscription === roomUuid : {}, sessionUuid : {}", roomUuid, sessionUuid);

		// sessionUuid와 roomUuid 맵핑
		sessionRoomMap.put(sessionUuid, roomUuid);
	}

	private void handleDisconnectSession(String sessionUuid) {
		log.info("handleDisconnectSession === sessionUuid : {}", sessionUuid);
		// 세션과 연결된 방 정보 삭제
		String roomUuid = sessionRoomMap.remove(sessionUuid);
		// 방 퇴장 처리
		RoomDto.StompResponse room = roomManager.leaveRoom(roomUuid, sessionUuid);
		// 방 정보 브로드캐스팅
		sendRoomInfo(roomUuid, room);
	}

	private void setAuthentication(String bearerToken) {
		log.info("subscribe 쓰레드 : {}", Thread.currentThread().getName());
		log.info("SUB token : {}", bearerToken);
		// Header의 jwt token 검증
		String token = resolveToken(bearerToken);

		log.info("SUB ::::::::: 유효한 토큰입니다.");
		//토큰 값에서 Authentication 값으로 가공해서 반환 후 저장
		Authentication authentication = tokenProvider.getAuthentication(token);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		log.info("SUB ::::::::: Security Context에 '{}' 인증 정보를 저장했습니다", authentication.getName());
		log.info("SUB ::::::::: Security Context에 저장되어 있는 인증 정보 입니다. '{}'", SecurityContextHolder.getContext().getAuthentication().getName());
	}

	private String resolveToken(String bearerToken) {
		log.info("Token 확인 : {}", bearerToken);
		if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) return bearerToken.substring(7);

		throw new TokenException(ExceptionCodeSet.TOKEN_NOT_EXISTS);
	}

	@MessageMapping("/room/connect")
	public void handleRoomConnect(StompHeaderAccessor headerAccessor) {
		log.info("connect 해보자..");
		String userUuid = headerAccessor.getFirstNativeHeader("userUuid");
		String roomUuid = headerAccessor.getFirstNativeHeader("roomUuid");
		String userType = headerAccessor.getFirstNativeHeader("userType");
		RoomDto.StompResponse room = null;

		log.info("handleRoomConnect === userUuid : {}, roomUuid : {}, userType : {}", userUuid, roomUuid, userType);

		if ("host".equals(userType)) {
			room = roomManager.createRoom(roomUuid, userUuid, headerAccessor.getSessionId());
		} else if ("guest".equals(userType)) {
			room = roomManager.joinRoom(roomUuid, userUuid, headerAccessor.getSessionId());
		}

		sendRoomInfo(roomUuid, room);
		log.info("connect 됐어!!");
	}

	@MessageMapping("/room/kickGuest")
	public void kickGuest(@Payload String roomUuid, StompHeaderAccessor stompHeaderAccessor) {
		log.info("강퇴 시작해볼까??");

		RoomDto.StompResponse room = roomManager.kickGuest(roomUuid, stompHeaderAccessor.getSessionId());
		sendRoomInfo(roomUuid, room);

		log.info("guest 강퇴 됐나? {}", room.getGuestSessionUuid() == null);
	}

	@MessageMapping("/room/delegateHost")
	public void delegateHost(@Payload String roomUuid, StompHeaderAccessor stompHeaderAccessor) {
		log.info("방장 변경 해볼까??");

		RoomDto.StompResponse room = roomManager.delegateHost(roomUuid, stompHeaderAccessor.getSessionId());

		log.info("방장 : {}, 게스트 : {}", room.getHost().getNickname(), room.getGuest().getNickname());

		sendRoomInfo(roomUuid, room);
	}

	@MessageMapping("/room/match")
	public void handleMatchRequest(@Payload String userUuid, @AuthenticationPrincipal Principal principal) {
		log.info("handleMatchRequest === 매칭 시도한 principal : {}", principal.getName());
		log.info("StompHandler 쓰레드 : {}", Thread.currentThread().getName());
		roomModifyService.addPlayerToMatchingQueue(userUuid, principal.getName());
	}

	@MessageMapping("/room/exit")
	public void exitRoom(@Payload String roomUuid, StompHeaderAccessor stompHeaderAccessor) {
		log.info("exitRoom === roomUuid : {}, sessionUuid : {}", roomUuid, stompHeaderAccessor.getSessionId());
		RoomDto.StompResponse room = roomManager.leaveRoom(roomUuid, stompHeaderAccessor.getSessionId());
		sendRoomInfo(roomUuid, room);
	}

	@MessageMapping("/room/ready")
	public void changeReadyStatus(@Payload String roomUuid, StompHeaderAccessor stompHeaderAccessor) {
		log.info("changeReadyStatus === ");
		log.info("session UUID : {}", stompHeaderAccessor.getSessionId());
		RoomDto.StompResponse room = roomManager.changeReadyStatus(roomUuid, stompHeaderAccessor.getSessionId());
		sendRoomInfo(roomUuid, room);
	}

	@MessageMapping("/game/progress")
	public void updateProgress(@Payload String roomUuid, StompHeaderAccessor stompHeaderAccessor) {
		log.info("updateProgress === ");
		log.info("session UUID : {}", stompHeaderAccessor.getSessionId());
		RoomDto.StompResponse room = roomManager.updateProgress(roomUuid, stompHeaderAccessor.getSessionId());
		sendRoomInfo(roomUuid, room);
	}

	@MessageMapping("/game/end")
	public void	resetStatus(@Payload String roomUuid) {
		log.info("Game end !! === ");
		log.info("room Uuid : {}", roomUuid);
		RoomDto.StompResponse room = roomManager.resetStatus(roomUuid);
		sendRoomInfo(roomUuid, room);
	}

	private void sendRoomInfo(String roomUuid, RoomDto.StompResponse room) {
		if(room.getHostSessionUuid() == null){
			log.info("BroadCasting Info ========== 방 폭파 히히");
		} else {
			log.info("BroadCasting Info ========== roomUuid: {}, host : {}", roomUuid, room.getHost().getNickname());
		}
		// 대기방 정보 브로드캐스팅
		messagingTemplate.convertAndSend("/topic/" + roomUuid, room);
	}
}
