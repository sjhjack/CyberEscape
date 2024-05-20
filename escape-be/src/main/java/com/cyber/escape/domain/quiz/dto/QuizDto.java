package com.cyber.escape.domain.quiz.dto;

import com.cyber.escape.domain.quiz.entity.Quiz;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class QuizDto {


    @Getter
    @Builder
    public static class Request{
        private String hint;
        private String answer;
        private int difficulty;
        private int themaCategory;
    }

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
    public static class QuizSubmissionResDto{

        private String quizUuid;
        private String content;
        private String url;
        private int difficulty;
        public QuizSubmissionResDto(String quizUuid, String content, String url, int difficulty){
            this.quizUuid = quizUuid;
            this.content = content;
            this.url = url;
            this.difficulty = difficulty;
        }

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
    @Builder
    public static class QuizHintResDto{
        private String hint;
        public QuizHintResDto(){
        }
        public QuizHintResDto(String hint){
            this.hint = hint;
        }
    }


}
