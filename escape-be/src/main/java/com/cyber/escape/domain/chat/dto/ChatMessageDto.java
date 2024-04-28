package com.cyber.escape.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ChatMessageDto {
    public enum MessageType {
        ENTER, TALK, EXIT
    }
    private String roomUuid;
    private Long sender;
    private String message;
    private Character isRead;
    private MessageType type;
}

