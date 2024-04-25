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
    @AllArgsConstructor
    public static class SubmitAnswerResDto{
        private String clue;
        private int order;
        private boolean isRight;

    }




    @Getter
    @Builder
    public static class SubmitFinalAnswerResDto{
        private boolean right;
        public SubmitFinalAnswerResDto(){
        }

        public SubmitFinalAnswerResDto(boolean right){
            this.right = right;
        }
    }


}
