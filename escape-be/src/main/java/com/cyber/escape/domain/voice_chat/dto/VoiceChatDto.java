package com.cyber.escape.domain.voice_chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.stereotype.Component;

@Getter
public class VoiceChatDto {

    @Builder
    @Getter
    public static class SessionResDto{
        private String sessionId;

        public SessionResDto(){

        }
        public SessionResDto(String sessionId){
            this.sessionId = sessionId;
        }
    }

    @Builder
    @Getter
    public static class ConnectionResDto{
        private String voiceChatToken;

        public ConnectionResDto(){

        }

        public ConnectionResDto(String voiceChatToken){
            this.voiceChatToken = voiceChatToken;
        }
    }
}
