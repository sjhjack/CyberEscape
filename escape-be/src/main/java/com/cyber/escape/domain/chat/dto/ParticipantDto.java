package com.cyber.escape.domain.chat.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

public class ParticipantDto {


    @Getter
    public static class ParticipantsDto{

        private final String userUuid;
        private final String nickname;

        @QueryProjection
        public ParticipantsDto(String userUuid, String nickname){
            this.userUuid = userUuid;
            this.nickname = nickname;
        }
    }

}
