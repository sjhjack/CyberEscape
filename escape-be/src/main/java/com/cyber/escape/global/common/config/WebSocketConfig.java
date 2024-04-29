package com.cyber.escape.global.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.messaging.simp.config.ChannelRegistration;

@Configuration

@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

//    private final StompHandler stompHandler;
//
//    public WebSocketConfig(StompHandler stompHandler) {
//        this.stompHandler = stompHandler;
//    }

    @Override
	public void configureMessageBroker(MessageBrokerRegistry registry){
		registry.setPathMatcher(new AntPathMatcher("."));	// url을 chat/room/3 -> chat.room.3으로 참조하기 위한 설정
		// client에서 SEND 요청을 처리한다.
		registry.setApplicationDestinationPrefixes("/pub");		// 메시지 발행 요청 prefix (메시지 전송)
		// registry.enableSimpleBroker("/sub");	// 메시지 구독 요청 prefix
		// Enable a STOMP broker relay and configure the destination prefixes supported by the message broker.
	    //여기서 모든 사용자에게 브로드캐스팅할 수 있는 방법을 생각해보자
		registry.enableStompBrokerRelay("/queue", "/topic", "/exchange", "/amq/queue");
	}

	// 웹소켓 핸드셰이크 커넥션을 생성할 경로
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry){
		registry.addEndpoint("/ws-stomp")
				.setAllowedOriginPatterns("*");
			//.withSockJS();
	}


//    @Override
//    public void configureClientInboundChannel(ChannelRegistration registration){
//        registration.interceptors(stompHandler);
//    }
}
