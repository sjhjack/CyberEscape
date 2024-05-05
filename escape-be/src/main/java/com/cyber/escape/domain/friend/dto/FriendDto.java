package com.cyber.escape.domain.friend.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class FriendDto {
    @Getter
    @Builder
    public static class FriendRelationRequest{
        //private final String fromUserUuid;
        private String toUserUuid;

        public FriendRelationRequest(){

        }

        public FriendRelationRequest(String toUserUuid){
            this.toUserUuid = toUserUuid;

        }
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class FriendRequest{
        // 친구를 맺고 싶은 친구의 uuid
        private final String receiverUuid;
        private final String notifyType;
    }

    @Getter
    @Builder
    public static class FriendListResponse{
        private String nickname;
        private String friendUuid;

        @Builder
        @QueryProjection
        public FriendListResponse(String friendUuid, String nickname){
            this.friendUuid = friendUuid;
            this.nickname = nickname;
        }
    }


}
