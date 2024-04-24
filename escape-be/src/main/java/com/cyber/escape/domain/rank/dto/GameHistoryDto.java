package com.cyber.escape.domain.rank.dto;

import lombok.*;
import java.time.LocalDateTime;



public class GameHistoryDto {
    @Getter
    @Builder
//    @AllArgsConstructor
//    @NoArgsConstructor
    public static class Request{
        private String userUuid;
        private String themaUuid;
        private LocalDateTime clearTime;
    }

}
