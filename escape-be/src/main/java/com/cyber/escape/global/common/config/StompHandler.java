package com.cyber.escape.global.common.config;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class StompHandler {
    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatRoomManager chatRoomManager;

    public StompHandler(SimpMessageSendingOperations messagingTemplate, ChatRoomManager chatRoomManager) {
        this.messagingTemplate = messagingTemplate;
        this.chatRoomManager = chatRoomManager;
    }

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");
        chatRoomManager.joinRoom(roomId, headerAccessor.getSessionId());
        messagingTemplate.convertAndSend("/topic/public", username + " has joined the chat.");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");
        chatRoomManager.leaveRoom(roomId, headerAccessor.getSessionId());
        messagingTemplate.convertAndSend("/topic/public", username + " has left the chat.");
    }

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        String roomId = (String) StompHeaderAccessor.wrap(chatMessage.getMessage()).getSessionAttributes().get("roomId");
        if (chatRoomManager.isUserInRoom(roomId, chatRoomManager.getUserSession(chatMessage.getSender()))) {
            messagingTemplate.convertAndSendToUser(chatRoomManager.getUserSession(chatMessage.getReceiver()), "/queue/messages", chatMessage);
        }
        return chatMessage;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               StompHeaderAccessor headerAccessor) {
        String username = chatMessage.getSender();
        String roomId = chatMessage.getRoomId();
        headerAccessor.getSessionAttributes().put("username", username);
        headerAccessor.getSessionAttributes().put("roomId", roomId);
        chatRoomManager.joinRoom(roomId, headerAccessor.getSessionId());
        return chatMessage;
    }
}
