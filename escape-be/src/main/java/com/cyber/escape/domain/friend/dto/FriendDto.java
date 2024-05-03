package com.cyber.escape.domain.friend.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class FriendDto {
    @Getter
    @Builder
    @AllArgsConstructor
    public static class friendRelationRequest{
        private final String fromUserUuid;
        private final String toUserUuid;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class friendRequest{
        // 친구를 맺고 싶은 친구의 uuid
        private final String receiverUuid;
        private final String notifyType;
    }

    @Getter
    @Builder
    public static class friendListResponse{
        private String nickname;
        private String friendUuid;

        @Builder
        @QueryProjection
        public friendListResponse(String friendUuid, String nickname){
            this.friendUuid = friendUuid;
            this.nickname = nickname;
        }
    }


}
