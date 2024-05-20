package com.cyber.escape.global.common.config;

import java.time.Duration;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.codec.json.Jackson2JsonDecoder;
import org.springframework.http.codec.json.Jackson2JsonEncoder;
import org.springframework.messaging.rsocket.RSocketStrategies;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompClientSupport;
import org.springframework.messaging.simp.stomp.StompReactorNettyCodec;
import org.springframework.messaging.tcp.TcpOperations;
import org.springframework.messaging.tcp.reactor.ReactorNettyTcpClient;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.messaging.simp.config.ChannelRegistration;

import com.cyber.escape.global.common.handler.CustomHandshakeHandler;
import com.cyber.escape.global.common.handler.RoomStompInterceptor;

import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import reactor.netty.resources.ConnectionProvider;
import reactor.netty.resources.PooledConnectionProvider;
import reactor.netty.tcp.TcpClient;

@Configuration

@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	@Value("${MQ_HOST}")
	String host;

	@Value("${MQ_USER_NAME}")
	String username;

	@Value("${MQ_PASSWORD}")
	String password;

	@Autowired
	private RoomStompInterceptor roomStompInterceptor;


	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry){
		// registry.setPathMatcher(new AntPathMatcher("."));	// url을 chat/room/3 -> chat.room.3으로 참조하기 위한 설정
		// client에서 SEND 요청을 처리한다.
		registry.setApplicationDestinationPrefixes("/pub");		// 메시지 발행 요청 prefix (메시지 전송)

		// Enable a STOMP broker relay and configure the destination prefixes supported by the message broker
		registry.enableStompBrokerRelay("/queue", "/topic", "/exchange", "/amq/queue")
													.setRelayHost(host)
													.setRelayPort(61613)
													.setSystemLogin(username)
													.setSystemPasscode(password)
													.setClientLogin(username)
													.setClientPasscode(password);
	}

	// 웹소켓 핸드셰이크 커넥션을 생성할 경로
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry){
		registry.addEndpoint("/ws-stomp")
				.setAllowedOriginPatterns("*")
				.setHandshakeHandler(new CustomHandshakeHandler())
			.withSockJS();
	}

	@Override
	public void configureClientInboundChannel(ChannelRegistration registration) {
		registration.interceptors(roomStompInterceptor);
	}

	// private TcpOperations<byte[]> createTcpClient() {
	// 	ConnectionProvider connectionProvider = ConnectionProvider.builder("myPool")
	// 		.maxConnections(10) // 최대 연결 수
	// 		.pendingAcquireTimeout(Duration.ofSeconds(5)) // 연결 획득 대기 시간
	// 		.build();
	//
	// 	ReactorNettyTcpClient<byte[]> tcpClient = new ReactorNettyTcpClient<>(
	// 		TcpClient.create(connectionProvider).port(61613),
	// 		new StompReactorNettyCodec()
	// 	);
	//
	// 	return tcpClient;
	// }
}
