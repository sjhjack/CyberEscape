package com.cyber.escape.domain.rank.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GameHistoryDto {
    private String userId;
    private String themaId;
    private LocalDateTime clearTime;
    private String uuid;
}
