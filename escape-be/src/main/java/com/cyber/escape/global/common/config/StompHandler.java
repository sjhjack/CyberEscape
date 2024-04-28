package com.cyber.escape.global.common.config;
import com.cyber.escape.domain.chat.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;


// 해당 클래스는 웹소켓 연결 전, 연결 후 추가적인 작업을 위한 interceptor를 추가 구성할 수 있게 해준다.
@Configuration
@EnableWebSocket
@Slf4j
public class StompHandler implements ChannelInterceptor {

    // stomp와 같은 단순 메시징 프로토콜을 위한 프로토콜
    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatRoomService chatRoomService;

    //메시지를 도착지까지 보내는 MessageSendingOperations<Destination>
    public StompHandler(SimpMessageSendingOperations messagingTemplate, ChatRoomService chatRoomService) {
        this.messagingTemplate = messagingTemplate;
        this.chatRoomService = chatRoomService;
    }

    // publisher가 message를 실제 채널에 전송하기 전에 호출된다.
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel){
        // wrap 메서드를 이용해 message를 감싸면 stomp의 헤더에 직접 접근이 가능하다고 한다!
        //StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message.());
        // 보아하니 이 코드는 헤더에 유저 name과 roomUuid를 담는가보군

        // websocket 연결 시 헤더의 jwt token 유효성 검증
//        if(StompCommand.CONNECT == headerAccessor.getCommand()){
//            final String authorization = jwtUtil.extractJwt(headerAccessor);
//            jwtUtils.validateToken(authorization);
//        }

        return message;
    }

    // 소켓 연결 됐을 때
    // 소켓 연결될 때 되는거면, 음.. 여기서 토큰
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        log.info("Received a new web socket connection");
        // 새로운 STOMP 메시지에 대한 헤더를 준비하거나 기존 메시지의 STOMP 관련 헤더에
        // 액세스 및/또는 수정하는 데 사용할 수 있습니다.

        // wrap 메서드를 이용해 message를 감싸면 stomp의 헤더에 직접 접근이 가능하다고 한다!
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        log.info("Current User SessionID : {}", headerAccessor.getSessionId());
        // 보아하니 이 코드는 헤더에 유저 name과 roomUuid를 담는가보군

        // websocket 연결 시 헤더의 jwt token 유효성 검증
//        if(StompCommand.CONNECT == headerAccessor.getCommand()){
//            final String authorization = jwtUtil.extractJwt(headerAccessor);
//            jwtUtils.validateToken(authorization);
//        }

        //chatRoomService.joinRoom(roomId, headerAccessor.getSessionId());
        //messagingTemplate.convertAndSend("/topic/public", username + " has joined the chat.");
    }

    // 소켓 연결 닫힐 때
    // 한 사용자가 채팅창을 닫을 때

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        //String username = (String) headerAccessor.getSessionAttributes().get("username");
        //String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");
        //chatRoomManager.leaveRoom(roomId, headerAccessor.getSessionId());
        //messagingTemplate.convertAndSend("/topic/public", username + " has left the chat.");
    }

//    @MessageMapping("/chat.sendMessage")
//    @SendTo("/topic/public")
//    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
//        String roomId = (String) StompHeaderAccessor.wrap(chatMessage.getMessage()).getSessionAttributes().get("roomId");
//        if (chatRoomManager.isUserInRoom(roomId, chatRoomManager.getUserSession(chatMessage.getSender()))) {
//            messagingTemplate.convertAndSendToUser(chatRoomManager.getUserSession(chatMessage.getReceiver()), "/queue/messages", chatMessage);
//        }
//        return chatMessage;
//    }
//
//    @MessageMapping("/chat.addUser")
//    @SendTo("/topic/public")
//    public ChatMessage addUser(@Payload ChatMessage chatMessage,
//                               StompHeaderAccessor headerAccessor) {
//        String username = chatMessage.getSender();
//        String roomId = chatMessage.getRoomId();
//        headerAccessor.getSessionAttributes().put("username", username);
//        headerAccessor.getSessionAttributes().put("roomId", roomId);
//        chatRoomManager.joinRoom(roomId, headerAccessor.getSessionId());
//        return chatMessage;
//    }
}
