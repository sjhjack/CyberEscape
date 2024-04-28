package com.cyber.escape.domain.chat.service;

import com.cyber.escape.domain.chat.Repository.MessageRepositoryImpl;
import com.cyber.escape.domain.chat.dto.ChatMessageDto;
import org.springframework.stereotype.Service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MessageService {
    private final MessageRepositoryImpl messageRepositoryCustom;

    public MessageService(MessageRepositoryImpl messageRepositoryCustom) {
        this.messageRepositoryCustom = messageRepositoryCustom;
    }

    public void saveMessage(ChatMessageDto messageDto){
        messageRepositoryCustom.saveMessage(messageDto);
    }
}
