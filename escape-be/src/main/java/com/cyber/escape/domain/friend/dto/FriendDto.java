package com.cyber.escape.domain.friend.dto;

import lombok.Builder;
import lombok.Getter;

public class FriendDto {
    @Getter
    @Builder
    public static class friendRequest{
        private String fromUserUuid;
        private String toUserUuid;
    }

}
