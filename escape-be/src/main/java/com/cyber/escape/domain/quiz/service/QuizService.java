package com.cyber.escape.domain.quiz.service;

import com.cyber.escape.domain.quiz.dto.QuizDto;
import com.cyber.escape.domain.quiz.entity.Quiz;
import com.cyber.escape.domain.quiz.repository.QuizRepository;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.QuizException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;


@Service
public class QuizService {

    private QuizRepository quizRepository;

    public QuizService(QuizRepository quizRepository){
        this.quizRepository = quizRepository;
    }

    // 퀴즈를 뽑는 로직
    public List<QuizDto.SelectedQuizDto> getQuizzes(String themaUuid) throws QuizException{
        List<QuizDto.SelectedQuizDto> result = new ArrayList<>();

        List<Quiz> quizList = quizRepository.findByThemaUuid(themaUuid)
                .orElseThrow(()-> new QuizException(ExceptionCodeSet.NICKNAME_DUPLICATED));

        QuizDto.SelectedQuizDto selectedQuizDto = null;

        for(int diff = 1; diff <= 3; diff++){
            int difficulty = diff;
            List<Quiz> QuizBylevel = quizList.stream().filter((q)-> q.getDifficulty() == difficulty).toList();

            Quiz selectedQuiz = getRandomQuiz(QuizBylevel);
            selectedQuizDto = quizToDto(selectedQuiz);
            result.add(selectedQuizDto);
        }

        // 최종 정답 선택하는 로직 추가

        return result;
    }

    public Quiz getRandomQuiz(List<Quiz> quizList){
        Random random = new Random();

        int size = quizList.size();

        // 0 ~ size - 1의 값을 반환한다.
        int randomIdx = random.nextInt(size);
        return quizList.get(randomIdx);
    }

    public QuizDto.SelectedQuizDto quizToDto(Quiz quiz){
        return QuizDto
                .SelectedQuizDto
                .builder()
                .quizUuid(quiz.getUuid())
                .url(quiz.getUrl())
                .difficulty(quiz.getDifficulty())
                .content(quiz.getContent())
                .build();
    }

}
