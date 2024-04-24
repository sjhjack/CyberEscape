package com.cyber.escape.domain.rank.dto;

import lombok.Builder;
import lombok.Getter;

import java.sql.Time;

public class RankingDto {
    @Getter
    @Builder
    public static class Request{
        private String userUuid;
        private String themaUuid;
        private String gameHistoryUuid;
        private Time bestTime;
    }
}
