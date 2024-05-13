package com.cyber.escape.global.common.handler;

import java.io.IOException;
import java.security.Principal;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import com.cyber.escape.domain.auth.security.StompPrincipal;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomHandshakeHandler extends DefaultHandshakeHandler {
	@Override
	protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String, Object> attributes) {
		return new StompPrincipal(UUID.randomUUID().toString());
	}

	@Override
	protected void handleInvalidUpgradeHeader(ServerHttpRequest request, ServerHttpResponse response) throws IOException {
		// NOTE: Upgrade 헤더에 올바르지 않은 값이 전달되었을때 호출된다.
		log.error("Method: {}, URI: {}, Principal: {}, Headers: {}", request.getMethod(), request.getURI(), request.getPrincipal(), request.getHeaders());
		super.handleInvalidUpgradeHeader(request, response);
	}
}
