package com.cyber.escape.global.common.handler;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class RoomStompInterceptor implements ChannelInterceptor {


	@Override
	public void postSend(Message message, MessageChannel channel, boolean sent) {
		StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
		String sessionId = accessor.getSessionId();
		log.info("Interceptor ==== sessionId : {}", sessionId);

		switch (accessor.getCommand()) {
			case CONNECT:
				// 유저가 Websocket으로 connect()를 한 뒤 호출됨
				log.info("Interceptor ==== connect info : {}", accessor.toString());
				break;
			case DISCONNECT:
				// 유저가 Websocket으로 disconnect() 를 한 뒤 호출됨 or 세션이 끊어졌을 때 발생함(페이지 이동~ 브라우저 닫기 등)
				// log.info("Disconnected roomUuid : {}", roomUuid);
				log.info("Interceptor ==== Disconnected info : {}", accessor.toString());
				break;
			default:
				break;
		}

	}
}
