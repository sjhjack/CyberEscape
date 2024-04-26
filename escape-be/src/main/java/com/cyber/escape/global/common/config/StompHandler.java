//package com.cyber.escape.global.common.config;
//import com.cyber.escape.domain.chat.service.ChatRoomService;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.context.event.EventListener;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.messaging.simp.SimpMessageSendingOperations;
//import org.springframework.messaging.simp.stomp.StompCommand;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.messaging.support.ChannelInterceptor;
//import org.springframework.stereotype.Component;
//import org.springframework.web.socket.messaging.SessionConnectedEvent;
//import org.springframework.web.socket.messaging.SessionDisconnectEvent;
//
//@Component
//@Slf4j
//// interceptor 역할을 하는 handler
//public class StompHandler implements ChannelInterceptor {
//
//    // stomp와 같은 단순 메시징 프로토콜을 위한 프로토콜
//    private final SimpMessageSendingOperations messagingTemplate;
//    private final ChatRoomService chatRoomService;
//
//    public StompHandler(SimpMessageSendingOperations messagingTemplate, ChatRoomService chatRoomService) {
//        this.messagingTemplate = messagingTemplate;
//        this.chatRoomService = chatRoomService;
//    }
//
//    // 소켓 연결 됐을 때
//    @EventListener
//    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
//        log.info("Received a new web socket connection");
//        // 새로운 STOMP 메시지에 대한 헤더를 준비하거나 기존 메시지의 STOMP 관련 헤더에
//        // 액세스 및/또는 수정하는 데 사용할 수 있습니다.
//
//        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
//        String username = (String) headerAccessor.getSessionAttributes().get("username");
//        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");
//        chatRoomService.joinRoom(roomId, headerAccessor.getSessionId());
//        messagingTemplate.convertAndSend("/topic/public", username + " has joined the chat.");
//    }
//
//    // 소켓 연결 닫힐 때
//    // 한 사용자가 채팅창을 닫을 때
//    @EventListener
//    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
//        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
//        String username = (String) headerAccessor.getSessionAttributes().get("username");
//        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");
//        //chatRoomManager.leaveRoom(roomId, headerAccessor.getSessionId());
//        //messagingTemplate.convertAndSend("/topic/public", username + " has left the chat.");
//    }
//
////    @MessageMapping("/chat.sendMessage")
////    @SendTo("/topic/public")
////    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
////        String roomId = (String) StompHeaderAccessor.wrap(chatMessage.getMessage()).getSessionAttributes().get("roomId");
////        if (chatRoomManager.isUserInRoom(roomId, chatRoomManager.getUserSession(chatMessage.getSender()))) {
////            messagingTemplate.convertAndSendToUser(chatRoomManager.getUserSession(chatMessage.getReceiver()), "/queue/messages", chatMessage);
////        }
////        return chatMessage;
////    }
////
////    @MessageMapping("/chat.addUser")
////    @SendTo("/topic/public")
////    public ChatMessage addUser(@Payload ChatMessage chatMessage,
////                               StompHeaderAccessor headerAccessor) {
////        String username = chatMessage.getSender();
////        String roomId = chatMessage.getRoomId();
////        headerAccessor.getSessionAttributes().put("username", username);
////        headerAccessor.getSessionAttributes().put("roomId", roomId);
////        chatRoomManager.joinRoom(roomId, headerAccessor.getSessionId());
////        return chatMessage;
////    }
//}
