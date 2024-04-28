package com.cyber.escape.domain.chat.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.Query;
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
//    @AllArgsConstructor
    @Builder
    public static class ChatRoomResDto{
        private String ChatRoomUuid;

        @QueryProjection
        public ChatRoomResDto(String chatRoomUuid){
            this.ChatRoomUuid = chatRoomUuid;
        }
    }

}
