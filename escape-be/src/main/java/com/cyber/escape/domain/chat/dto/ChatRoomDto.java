package com.cyber.escape.domain.chat.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ChatRoomDto {

    @Getter
    @AllArgsConstructor
    public static class CreateChatRoomReqDto{
        private final String title;
        private final String nickname;
        // 같이 채팅하려는 친구 uuid
        private final String userUuid;
    }

    @Getter
    @NoArgsConstructor(force = true)
//    @AllArgsConstructor
    public static class CreateChatRoomResDto{
        private String ChatRoomUuid;

        @QueryProjection
        @Builder
        public CreateChatRoomResDto(String chatRoomUuid){
            this.ChatRoomUuid = chatRoomUuid;
        }
    }

    @AllArgsConstructor
    @Getter
    public static class ExitChatRoomReqDto{
        private final String chatRoomUuid;
        private final String exitUserUuid;
    }

    @Getter
    public static class MyChatListDto{
        private final String chatRoomUuid;
        private final List<ParticipantDto.ParticipantsDto> participantsList;

        @QueryProjection
        public MyChatListDto(String chatRoomUuid, List<ParticipantDto.ParticipantsDto> participantsList){
            this.chatRoomUuid = chatRoomUuid;
            this.participantsList = participantsList;
        }

    }

}
