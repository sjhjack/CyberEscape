package com.cyber.escape.domain.chat.service;

import com.cyber.escape.domain.chat.repository.MessageRepositoryImpl;
import com.cyber.escape.domain.chat.dto.ChatMessageDto;
import org.springframework.stereotype.Service;


import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class MessageService {
    private final MessageRepositoryImpl messageRepositoryImpl;

    public MessageService(MessageRepositoryImpl messageRepositoryImpl) {
        this.messageRepositoryImpl = messageRepositoryImpl;
    }

    public void saveMessage(ChatMessageDto messageDto){
        messageRepositoryImpl.saveMessage(messageDto);
    }
}
