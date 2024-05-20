package com.cyber.escape.domain.quiz.util;

import com.cyber.escape.domain.quiz.dto.QuizDto;
import com.cyber.escape.domain.quiz.entity.Quiz;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

@Component
public class QuizMapper {
    public QuizDto.QuizSubmissionResDto toDto(Quiz quiz){
        return QuizDto
                .QuizSubmissionResDto
                .builder()
                .quizUuid(quiz.getUuid())
                .url(quiz.getUrl())
                .difficulty(quiz.getDifficulty())
                .content(quiz.getContent())
                .build();
    }


}
