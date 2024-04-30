package com.cyber.escape.domain.chat.controller;

import com.cyber.escape.domain.chat.dto.ChatMessageDto;
import com.cyber.escape.domain.chat.service.MessageService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class MessageController {
    private final RabbitTemplate rabbitTemplate;
    private final MessageService messageService;

    public MessageController(RabbitTemplate rabbitTemplate, MessageService messageService) {
        this.rabbitTemplate = rabbitTemplate;
        this.messageService = messageService;
    }

    // 채팅방 입장
    @MessageMapping("chat.enter.{roomUuid}")
    public void enterUser(@DestinationVariable String roomUuid, @Payload ChatMessageDto message){
        log.info("ENTER 입장합니다.");
        message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        rabbitTemplate.convertAndSend("chat.exchange", "chat.room.enter." + roomUuid, message);
        messageService.saveMessage(message);
    }

    // 채팅방 대화
    @MessageMapping("chat.talk.{roomUuid}")
    public void talkUser(@DestinationVariable String roomUuid, @Payload ChatMessageDto message){
        log.info("TALK 합니다.");
        rabbitTemplate.convertAndSend("chat.exchange", "chat.room.talk." + roomUuid, message);
        messageService.saveMessage(message);
    }

    // 채팅방 퇴장
    @MessageMapping("chat.exit.{roomUuid}")
    public void exitUser(@DestinationVariable String roomUuid, @Payload ChatMessageDto message){
        message.setMessage(message.getSender() + "님이 퇴장하셨습니다.");
        rabbitTemplate.convertAndSend("chat.exchange", "chat.room.exit." + roomUuid, message);
        messageService.saveMessage(message);
    }

    // receiver()는 단순히 큐에 들어온 메세지를 소비만 한다.
    @RabbitListener(queues = "chat.queue")
    public void receive(ChatMessageDto chatMessageDto) {
        log.info("receive ============ chatDto.getMessage() = {}",chatMessageDto.getMessage());
        // notificationService.send((long)chatMessageDto.getSender(), Notify.NotificationType.CHAT, "새로운 채팅 메시지가 있습니다.");
    }

    // @RabbitListener(queues = "#{container.queueNames}")
    // public void handleMessage(ChatMessageDto chatMessageDto) {
    // 	log.info("Received message: {}", chatMessageDto.getMessage());
    // }
}
