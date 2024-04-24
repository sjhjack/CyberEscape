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
    public static class QuizData{
        // quizId - number : answer, hint, 이미 풀었는가
        private final String answer;
        private final String hint;
        private final String finalQuizUuid;
    }

    @Builder
    @Getter
    @NoArgsConstructor(force = true)
    @AllArgsConstructor
    public static class finalAnswerData{
        private final String quizUuid;
        private final String finalAnswer;
        private final String[] clues;
        private final boolean[] isUsed;
    }
}
