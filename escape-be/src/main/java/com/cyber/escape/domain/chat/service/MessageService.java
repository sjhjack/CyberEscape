package com.cyber.escape.domain.chat.service;

import com.cyber.escape.domain.chat.entity.ChatMessage;
import com.cyber.escape.domain.chat.repository.ChatRoomRepository;
import com.cyber.escape.domain.chat.repository.MessageRepository;
import com.cyber.escape.domain.chat.dto.ChatMessageDto;
import com.cyber.escape.domain.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;


import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class MessageService {
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    private final MessageRepository messageRepository;

    public MessageService(ChatRoomRepository chatRoomRepository, UserRepository userRepository, MessageRepository messageRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
        //this.messageRepositoryImpl = messageRepositoryImpl;
    }

    public void saveMessage(ChatMessageDto messageDto){
        //
        log.info("현재 들어오는 채팅방 uuid : {}", messageDto.getRoomUuid());
        ChatMessage message = ChatMessage.builder()
                .chatRoom(chatRoomRepository.findByUuid(messageDto.getRoomUuid())
                        .orElseThrow(() -> new EntityNotFoundException("채팅방이 존재하지 않습니다.")))
                .sender(userRepository.findUserByUuid(messageDto.getSender())
                        .orElseThrow(() -> new EntityNotFoundException("사용자가 존재하지 않습니다.")))
                .content(messageDto.getMessage())
                //.isRead('F')
                .type(messageDto.getType().name())
                .build();

        messageRepository.save(message);
    }
}
