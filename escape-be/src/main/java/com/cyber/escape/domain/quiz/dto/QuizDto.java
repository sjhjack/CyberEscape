package com.cyber.escape.domain.quiz.dto;

import com.cyber.escape.domain.quiz.entity.Quiz;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class QuizDto {

    @Getter
    public static class QuizSubmissionDto{
        String themaUuid;

        public QuizSubmissionDto(){

        }
        public QuizSubmissionDto(String themaUuid){
            this.themaUuid = themaUuid;
        }
    }

    @Builder
    @Getter
    @AllArgsConstructor
    public static class SelectedQuizDto{

        private final int difficulty;
        private final String quizUuid;
        private final String content;
        private final String url;

        public static SelectedQuizDto selectedQuizToDto(Quiz quiz){
            return SelectedQuizDto.builder()
                    .quizUuid(quiz.getUuid())
                    .content(quiz.getContent())
                    .url(quiz.getUrl())
                    .difficulty(quiz.getDifficulty())
                    .build();
        }
    }

}
