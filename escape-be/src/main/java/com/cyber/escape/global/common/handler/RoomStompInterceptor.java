package com.cyber.escape.global.common.handler;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.cyber.escape.domain.auth.jwt.TokenProvider;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.TokenException;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class RoomStompInterceptor implements ChannelInterceptor {

	private final TokenProvider tokenProvider;
	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {
		StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
		if (StompCommand.CONNECT == accessor.getCommand()) { // websocket 연결요청
			log.info("Interceptor 쓰레드 : {}", Thread.currentThread().getName());
			String bearerToken = accessor.getFirstNativeHeader("Authorization");
			log.info("CONNECT token : {}", bearerToken);
			// Header의 jwt token 검증
			String token = resolveToken(bearerToken);

			log.info("Interceptor ::::::::: 유효한 토큰입니다.");
			//토큰 값에서 Authentication 값으로 가공해서 반환 후 저장
			Authentication authentication = tokenProvider.getAuthentication(token);
			SecurityContextHolder.getContext().setAuthentication(authentication);
			log.info("Interceptor ::::::::: Security Context에 '{}' 인증 정보를 저장했습니다", authentication.getName());
			log.info("Interceptor ::::::::: Security Context에 저장되어 있는 인증 정보 입니다. '{}'", SecurityContextHolder.getContext().getAuthentication().getName());
		}

		return message;
	}

	private String resolveToken(String bearerToken) {
		log.info("Token 확인 : {}", bearerToken);
		if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) return bearerToken.substring(7);

		throw new TokenException(ExceptionCodeSet.TOKEN_NOT_EXISTS);
	}

	// @Override
	// public void postSend(Message message, MessageChannel channel, boolean sent) {
	// 	StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
	// 	String sessionId = accessor.getSessionId();
	// 	log.info("Interceptor ==== sessionId : {}", sessionId);
	//
	// 	switch (accessor.getCommand()) {
	// 		case CONNECT:
	// 			// 유저가 Websocket으로 connect()를 한 뒤 호출됨
	// 			log.info("Interceptor ==== connect info : {}", accessor.toString());
	// 			break;
	// 		case DISCONNECT:
	// 			// 유저가 Websocket으로 disconnect() 를 한 뒤 호출됨 or 세션이 끊어졌을 때 발생함(페이지 이동~ 브라우저 닫기 등)
	// 			// log.info("Disconnected roomUuid : {}", roomUuid);
	// 			log.info("Interceptor ==== Disconnected info : {}", accessor.toString());
	// 			break;
	// 		default:
	// 			break;
	// 	}
	//
	// }
}
