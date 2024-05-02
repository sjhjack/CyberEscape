package com.cyber.escape.domain.voice_chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.stereotype.Component;

@Component
public class VoiceChatDto {

    @Builder
    @AllArgsConstructor
    public static class SessionResDto{
        private final String sessionId;
    }

    @Builder
    @AllArgsConstructor
    public static class ConnectionResDto{
        private String voiceChatToken;
    }
}
