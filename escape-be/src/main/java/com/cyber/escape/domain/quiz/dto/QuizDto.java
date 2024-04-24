package com.cyber.escape.domain.quiz.dto;

import com.cyber.escape.domain.quiz.entity.Quiz;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class QuizDto {

    @Getter
    public static class QuizSubmissionReqDto{
        String themaUuid;
        int role;

        public QuizSubmissionReqDto(){

        }
        public QuizSubmissionReqDto(String themaUuid, int role){
            this.themaUuid = themaUuid;
            this.role = role;
        }
    }

    @Builder
    @Getter
    @AllArgsConstructor
    public static class SelectedQuizResDto{

        private final int difficulty;
        private final String quizUuid;
        private final String content;
        private final String url;

        public static SelectedQuizResDto selectedQuizToDto(Quiz quiz){
            return SelectedQuizResDto.builder()
                    .quizUuid(quiz.getUuid())
                    .content(quiz.getContent())
                    .url(quiz.getUrl())
                    .difficulty(quiz.getDifficulty())
                    .build();
        }
    }

    @AllArgsConstructor
    public class SubmitAnswerReqDto{
        private final String quizUuid;
        private final String answer;
    }

    @AllArgsConstructor
    public class SubmitAnswerResDto{
        private final String clue;
        private final boolean isRight;
    }


}
