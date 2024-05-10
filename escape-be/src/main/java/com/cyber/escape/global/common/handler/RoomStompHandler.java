package com.cyber.escape.global.common.handler;

import java.security.Principal;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.cyber.escape.domain.room.dto.RoomDto;
import com.cyber.escape.domain.room.manager.RoomManager;
import com.cyber.escape.domain.room.service.RoomModifyService;

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
	private Map<String, String> sessionRoomMap = new ConcurrentHashMap<>();

	@EventListener
	public void handleWebSocketConnectListener(SessionConnectedEvent event) {
		log.info("연결 성공");
		log.info("Connection event : {}", event.toString());
	}

	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		// StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
		// String roomUuid = headerAccessor.getNativeHeader("roomUuid").get(0);
		// String roomUuid = headerAccessor.getFirstNativeHeader("roomUuid");

		// log.info("Disconnected roomUuid : {}", roomUuid);

		// RoomDto.StompResponse room = roomManager.leaveRoom(roomUuid, headerAccessor.getSessionId());
		//
		// sendRoomInfo(roomUuid, room);

		log.info("RoomStompHandler === sessionUuid : {}", event.getSessionId());
		handleDisconnectSession(event.getSessionId());
	}

	@MessageMapping("/room/connect")
	public void handleRoomConnect(StompHeaderAccessor headerAccessor) {
		log.info("connect 해보자..");
		String userUuid = headerAccessor.getFirstNativeHeader("userUuid");
		String roomUuid = headerAccessor.getFirstNativeHeader("roomUuid");
		String userType = headerAccessor.getFirstNativeHeader("userType");
		RoomDto.StompResponse room = null;

		log.info("userUuid : {}, roomUuid : {}, userType : {}", userUuid, roomUuid, userType);
		log.info("들어왔어");

		if ("host".equals(userType)) {
			room = roomManager.createRoom(roomUuid, userUuid, headerAccessor.getSessionId());
		} else if ("guest".equals(userType)) {
			room = roomManager.joinRoom(roomUuid, userUuid, headerAccessor.getSessionId());
		}

		sendRoomInfo(roomUuid, room);
		log.info("connect 됐어..");
	}

	@MessageMapping("/room/kickGuest")
	public void kickGuest(@Payload String roomUuid, StompHeaderAccessor headerAccessor) {
		log.info("강퇴 시작해볼까??");

		roomManager.isHostInRoom(roomUuid, headerAccessor.getSessionId());
		RoomDto.StompResponse room = roomManager.kickGuest(roomUuid);

		// convertAndSendToUser 사용 시 유저 개인에게 전송 가능하며 "/user"가 자동으로 prefix에 추가된다.
		// 즉, /user/{guestSessionId}/queue/kick 으로 전송된다.
		// Client는 /user/queue/kick을 구독하여 수신한다. (자신의 SessionId와 맵핑되어 자동으로 받아진다)
		// messagingTemplate.convertAndSendToUser(guestSessionId, "/queue/kick", "강제퇴장 되었습니다.");
		// -> 이거 없이 방 정보만 줘도 충분하다고 한다.

		sendRoomInfo(roomUuid, room);

		log.info("guest 강퇴 됐나? {}", room.getGuestSessionId() == null);
	}

	@MessageMapping("/room/delegateHost")
	public void delegateHost(@Payload String roomUuid, StompHeaderAccessor headerAccessor) {
		log.info("방장 변경 해볼까??");

		roomManager.isHostInRoom(roomUuid, headerAccessor.getSessionId());
		RoomDto.StompResponse room = roomManager.delegateHost(roomUuid);

		log.info("방장 : {}, 게스트 : {}", room.getHost().getNickname(), room.getGuest().getNickname());

		sendRoomInfo(roomUuid, room);
	}

	private void sendRoomInfo(String roomUuid, RoomDto.StompResponse room) {
		log.info("BroadCasting Info ========== roomUuid: {}, host : {}", roomUuid, room.getHost().getNickname());
		// 대기방 정보 브로드캐스팅
		messagingTemplate.convertAndSend("/topic/" + roomUuid, room);
	}

	@MessageMapping("/room/match")
	public void handleMatchRequest(Principal principal) {
		log.info("매칭 시도한 principal의 UUID : {}", principal.getName());
		roomModifyService.addPlayerToMatchingQueue(principal.getName());
	}

	@SubscribeMapping("/topic/{roomUuid}")
	public void handleRoomSubscription(@DestinationVariable String roomUuid, Principal principal) {
		String sessionUuid = principal.getName();
		log.info("handleRoomSubscription === roomUuid : {}, sessionUuid : {}", roomUuid, sessionUuid);
		// sessionUuid와 roomUuid 맵핑
		sessionRoomMap.put(sessionUuid, roomUuid);
	}

	@MessageMapping("/room/exit/{roomUuid}")
	public void exitRoom(@DestinationVariable String roomUuid, Principal principal) {
		log.info("exitRoom === roomUuid : {}, sessionUuid : {}", roomUuid, principal.getName());
		roomManager.leaveRoom(roomUuid, principal.getName());
	}

	private void handleDisconnectSession(String sessionUuid) {
		String roomUuid = sessionRoomMap.get(sessionUuid);
		roomManager.leaveRoom(roomUuid, sessionUuid);
	}
}
