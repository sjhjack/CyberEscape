// package com.cyber.escape.global.common.handler;
//
// import java.net.URI;
// import java.util.Optional;
//
// import org.springframework.messaging.simp.stomp.StompCommand;
// import org.springframework.messaging.simp.stomp.StompHeaders;
// import org.springframework.messaging.simp.stomp.StompSession;
// import org.springframework.messaging.simp.stomp.StompSessionHandler;
// import org.springframework.web.socket.CloseStatus;
// import org.springframework.web.socket.TextMessage;
// import org.springframework.web.socket.WebSocketSession;
// import org.springframework.web.socket.handler.TextWebSocketHandler;
//
// import lombok.extern.slf4j.Slf4j;
//
// @Slf4j
// public class GameRoomWebSocketHandler extends StompSessionHandler{
// 	private StompSession session;
//
// 	@Override
// 	public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
// 		this.session = session;
// 		// 연결 후 로직 추가
// 		Optional<String> roomIdOptional = getRoomIdFromSession(session);
//
// 		if (roomIdOptional.isPresent()) {
// 			String roomId = roomIdOptional.get();
// 			log.info("Client connected with roomId: {}", roomId);
// 			// roomId를 사용하여 로직을 처리합니다.
// 			// 예: gameRoomService.getGameRoom(roomId);
// 		} else {
// 			log.info("Client did not provide a roomId");
// 		}
// 	}
//
// 	@Override
// 	public void handleFrame(StompHeaders headers, Object payload) {
// 		// 메시지 처리 로직
// 		String msg = (String) payload;
// 		log.info("Received message: {}", msg);
// 	}
//
// 	@Override
// 	public void handleException(StompSession session, StompCommand command, StompHeaders headers, byte[] payload, Throwable exception) {
// 		// 예외 처리 로직
// 		log.error("Exception during STOMP communication: ", exception);
// 	}
//
// 	@Override
// 	public void handleTransportError(StompSession session, Throwable exception) {
// 		// 연결 오류 처리 로직
// 		log.error("Transport error during STOMP communication: ", exception);
// 	}
//
// 	@Override
// 	public void afterDisconnected(StompSession session, StompHeaders disconnectHeaders, CloseStatus closeStatus) {
// 		// 연결 종료 로직
// 		log.info("Connection closed: {}", closeStatus);
// 	}
//
// 	private Optional<String> getRoomIdFromSession(StompSession session) {
// 		URI uri = session.getUri();
// 		if (uri == null) {
// 			return Optional.empty();
// 		}
//
// 		// 쿼리 문자열에서 roomId 파라미터 추출
// 		String query = uri.getQuery();
// 		if (query == null) {
// 			return Optional.empty();
// 		}
//
// 		// 쿼리 문자열을 "="로 분리하여 roomId 값 추출
// 		String[] keyValue = query.split("=");
// 		if (keyValue.length == 2 && keyValue[0].equals("roomId")) {
// 			return Optional.of(keyValue[1]);
// 		}
//
// 		return Optional.empty();
// 	}
// }