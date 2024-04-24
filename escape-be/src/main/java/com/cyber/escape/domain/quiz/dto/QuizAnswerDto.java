package com.cyber.escape.domain.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class QuizAnswerDto {

    @AllArgsConstructor
    @Getter
    public static class SubmitAnswerReqDto{
        private final String quizUuid;
        private final String answer;
    }

    @AllArgsConstructor
    @Getter
    @Builder
    public static class SubmitAnswerResDto{
        private final String clue;
        private final boolean isRight;
    }


}
