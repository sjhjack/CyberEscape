package com.cyber.escape.domain.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class QuizAnswerDto {

    @AllArgsConstructor
    @Getter
    public static class SubmitAnswerReqDto{
        private String quizUuid;
        private String answer;

//        public SubmitAnswerReqDto(String quizUuid, String answer){
//            this.quizUuid = quizUuid;
//            this.answer = answer;
//        }
    }

    @Getter
    @Builder
    public static class SubmitAnswerResDto{
        private Object clue;
        private int order;
        private boolean isRight;

        public SubmitAnswerResDto(Object clue, int order, boolean isRight){
            this.clue = clue;
            this.order = order;
            this.isRight = isRight;
        }
    }


}
