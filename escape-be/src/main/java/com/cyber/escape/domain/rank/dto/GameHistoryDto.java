package com.cyber.escape.domain.rank.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.LocalDateTime;



public class GameHistoryDto {
    @Data
    @Builder
//    @AllArgsConstructor
//    @NoArgsConstructor
    public static class Request{
        private String userUuid;
        private String themaUuid;
        private LocalDateTime clearTime;
    }

}
