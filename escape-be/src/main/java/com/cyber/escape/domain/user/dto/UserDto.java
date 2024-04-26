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
}
