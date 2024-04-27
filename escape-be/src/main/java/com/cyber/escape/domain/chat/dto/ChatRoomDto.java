package com.cyber.escape.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
public class ChatRoomDto {

    @Getter
    @AllArgsConstructor
    public static class ChatRoomReqDto{
        private final String title;
        private final String nickname;
        // 같이 채팅하려는 친구 uuid
        private final String userUuid;
    }

    @Getter
    @NoArgsConstructor(force = true)
    @AllArgsConstructor
    @Builder
    public static class ChatRoomResDto{
        private final String ChatRoomUuid;

    }

}
