package com.cyber.escape.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalTime;

public class UserDto {
    @Getter
    @Builder
    public static class NicknameResponse{
        private String[] words;
        private String seed;
    }

    @Getter
    @Builder
    public static class ChangeNickname{
        private String nickname;
    }

    @Getter
    @Builder
    public static class SearchNicknameRequest{
        private String fromUserUuid;
        private String nickname;
    }

    @Getter
    @Builder
    public static class SearchNicknameResponse{
        private String nickname;
        private String relationship;
    }

}
