package com.cyber.escape.domain.quiz.data;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
@Getter
@AllArgsConstructor
// 정답을 쪼갠 걸 레디스에 저장
public class QuizDataInRedis {

    @Builder
    @Getter
    @NoArgsConstructor(force = true)
    @AllArgsConstructor
    public static class MapQuizWithClueData{
        private String finalUuid;
        private Integer clueIdx;
        private String clue;
    }

    @Builder
    @Getter
    @NoArgsConstructor(force = true)
    @AllArgsConstructor
    public static class finalAnswerData{
        private final String finalAnswer;
    }
}
