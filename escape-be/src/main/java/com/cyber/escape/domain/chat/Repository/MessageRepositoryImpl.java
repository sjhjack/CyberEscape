package com.cyber.escape.domain.chat.Repository;

import com.cyber.escape.domain.chat.dto.ChatMessageDto;
import com.cyber.escape.domain.chat.entity.ChatMessage;
import com.cyber.escape.domain.user.repository.UserRepository;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MessageRepositoryCustomImpl {
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    //private final MessageRepository messageRepository;

    public MessageRepositoryCustomImpl(ChatRoomRepository chatRoomRepository, UserRepository userRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.userRepository = userRepository;
        //this.messageRepository = messageRepository;
    }

    public void saveMessage(ChatMessageDto messageDto){
        ChatMessage message = ChatMessage.builder()
                .chatRoom(chatRoomRepository.findById(Long.parseLong(messageDto.getRoomId()))
                        .orElseThrow(() -> new EntityNotFoundException("채팅방이 존재하지 않습니다.")))
                .member(userRepository.findById(messageDto.getSender())
                        .orElseThrow(() -> new EntityNotFoundException("사용자가 존재하지 않습니다.")))
                .content(messageDto.getMessage())
                .isRead('F')
                .type(messageDto.getType().name())
                .build();

        messageRepository.save(message);
    }
}
