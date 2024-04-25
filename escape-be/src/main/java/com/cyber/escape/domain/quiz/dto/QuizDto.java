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
    public static class QuizSubmissionResDto{

        private final int difficulty;
        private final String quizUuid;
        private final String content;
        private final String url;

        public static QuizSubmissionResDto selectedQuizToDto(Quiz quiz){
            return QuizSubmissionResDto.builder()
                    .quizUuid(quiz.getUuid())
                    .content(quiz.getContent())
                    .url(quiz.getUrl())
                    .difficulty(quiz.getDifficulty())
                    .build();
        }
    }

    @Getter
    public static class QuizHintReqDto{
        private String quizUuid;
        public QuizHintReqDto(){
        }
        public QuizHintReqDto(String quizUuid){
            this.quizUuid = quizUuid;
        }
    }

    @Getter
    public static class QuizHintResDto{
        private String hint;
        public QuizHintResDto(){
        }
        public QuizHintResDto(String hint){
            this.hint = hint;
        }
    }

}
