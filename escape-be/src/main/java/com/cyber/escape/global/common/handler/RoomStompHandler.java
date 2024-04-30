package com.cyber.escape.global.common.handler;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.cyber.escape.domain.room.dto.RoomDto;
import com.cyber.escape.domain.room.manager.RoomManager;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

// @Component
@RestController
@RequiredArgsConstructor
@Slf4j
public class RoomStompHandler {
	private final SimpMessageSendingOperations messagingTemplate;
	private final RoomManager roomManager;

	@EventListener
	public void handleWebSocketConnectListener(SessionConnectedEvent event) {
		// log.info("Connection event : {}", event.toString());
		// StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
		// log.info("headerAccessor : {}", headerAccessor.toString());
		// String userUuid = headerAccessor.getNativeHeader("userUuid").get(0);
		// String roomUuid = headerAccessor.getNativeHeader("roomUuid").get(0);
		// String userType = headerAccessor.getNativeHeader("userType").get(0);
		//
		// log.info("Connected roomUuid : {}", roomUuid);
		//
		// if ("host".equals(userType)) {
		// 	roomManager.createRoom(roomUuid, userUuid, headerAccessor.getSessionId());
		// } else if ("guest".equals(userType)) {
		// 	roomManager.joinRoom(roomUuid, userUuid, headerAccessor.getSessionId());
		// }
		//
		// RoomDto.StompResponse room = roomManager.getRoom(roomUuid);
		// sendRoomInfo(roomUuid, room);
		log.info("연결 성공");
		log.info("Connection event : {}", event.toString());
	}

	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
		String roomUuid = headerAccessor.getNativeHeader("roomUuid").get(0);

		log.info("Disconnected roomUuid : {}", roomUuid);

		RoomDto.StompResponse room = roomManager.leaveRoom(roomUuid, headerAccessor.getSessionId());

		sendRoomInfo(roomUuid, room);
	}

	@MessageMapping("room.connect")
	public void handleRoomConnect(StompHeaderAccessor headerAccessor) {
		String userUuid = headerAccessor.getFirstNativeHeader("userUuid");
		String roomUuid = headerAccessor.getFirstNativeHeader("roomUuid");
		String userType = headerAccessor.getFirstNativeHeader("userType");

		log.info("userUuid : {}, roomUuid : {}, userType : {}", userUuid, roomUuid, userType);
		log.info("들어왔어");

		if ("host".equals(userType)) {
			roomManager.createRoom(roomUuid, userUuid, headerAccessor.getSessionId());
		} else if ("guest".equals(userType)) {
			roomManager.joinRoom(roomUuid, userUuid, headerAccessor.getSessionId());
		}

		RoomDto.StompResponse room = roomManager.getRoom(roomUuid);
		sendRoomInfo(roomUuid, room);
	}

	@MessageMapping("/room.kickGuest")
	public void kickGuest(@Payload String roomUuid, StompHeaderAccessor headerAccessor) {
		if (roomManager.isHostInRoom(roomUuid, headerAccessor.getSessionId())) {
			String guestSessionId = roomManager.kickGuest(roomUuid);
			RoomDto.StompResponse room = roomManager.getRoom(roomUuid);

			sendRoomInfo(roomUuid, room);
			// convertAndSendToUser 사용 시 유저 개인에게 전송 가능하며 "/user"가 자동으로 prefix에 추가된다.
			// 즉, /user/{guestSessionId}/queue/kick 으로 전송된다.
			// Client는 /user/queue/kick을 구독하여 수신한다. (자신의 SessionId와 맵핑되어 자동으로 받아진다)
			messagingTemplate.convertAndSendToUser(guestSessionId, "/queue/kick", "강제퇴장 되었습니다.");
		}
	}

	@MessageMapping("/room.delegateHost")
	public void delegateHost(@Payload String roomUuid, StompHeaderAccessor headerAccessor) {
		if (roomManager.isHostInRoom(roomUuid, headerAccessor.getSessionId())) {
			String guestSessionId = (String)headerAccessor.getSessionAttributes().get("userUuid");
			RoomDto.StompResponse room = roomManager.delegateHost(roomUuid, guestSessionId);

			sendRoomInfo(roomUuid, room);
		}
	}

	private void sendRoomInfo(String roomUuid, RoomDto.StompResponse room) {
		log.info("BroadCasting Info ========== roomUuid: {}, room : {}", roomUuid, room.toString());
		// 대기방 정보 브로드캐스팅
		messagingTemplate.convertAndSend("/topic/" + roomUuid, room);
	}
}
