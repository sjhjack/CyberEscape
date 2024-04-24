package com.cyber.escape.domain.quiz.service;

import com.cyber.escape.domain.quiz.dto.QuizDto;
import com.cyber.escape.domain.quiz.entity.FinalAnswer;
import com.cyber.escape.domain.quiz.entity.Quiz;
import com.cyber.escape.domain.quiz.repository.FinalAnswerRepository;
import com.cyber.escape.domain.quiz.repository.QuizRepository;
import com.cyber.escape.domain.quiz.util.QuizMapper;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.QuizException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;


@Service
public class QuizService {

    private QuizMapper quizMapper;
    private QuizRepository quizRepository;
    private FinalAnswerRepository finalAnswerRepository;
    private RedisTemplate<String, String> answerStore;

    public QuizService(QuizRepository quizRepository,
                       FinalAnswerRepository finalAnswerRepository,
                       QuizMapper quizMapper,
                       RedisTemplate<String, String> answerStore) {

        this.quizRepository = quizRepository;
        this.finalAnswerRepository = finalAnswerRepository;
        this.quizMapper = quizMapper;
        this.answerStore = answerStore;
    }

    // 퀴즈를 뽑는 로직
    public List<QuizDto.SelectedQuizDto> getQuizzes(String themaUuid) throws QuizException{
        List<QuizDto.SelectedQuizDto> result = new ArrayList<>();

        List<Quiz> quizList = quizRepository.findByThemaUuid(themaUuid)
                .orElseThrow(()-> new QuizException(ExceptionCodeSet.NICKNAME_DUPLICATED));

        QuizDto.SelectedQuizDto selectedQuizDto = null;

        // 난이도 1 ~ 3의 문제를 랜덤으로 뽑는다.
        for(int diff = 1; diff <= 3; diff++){
            int difficulty = diff;
            List<Quiz> QuizBylevel = quizList.stream().filter((q)-> q.getDifficulty() == difficulty).toList();

            Quiz selectedQuiz = getRandomQuiz(QuizBylevel);
            selectedQuizDto = quizMapper.toDto(selectedQuiz);
            result.add(selectedQuizDto);
        }

        // 최종 정답 선택하는 로직 추가
        FinalAnswer finalAnswer = finalAnswerRepository.findRandomAnswer().get();
        // 레디스에 최종 정답을 저장
        answerStore.opsForValue().set(finalAnswer.getUuid(), finalAnswer.getAnswer());

        return result;
    }

    // 랜덤한 숫자를 뽑아서 퀴즈를 선택
    private Quiz getRandomQuiz(List<Quiz> quizList){
        Random random = new Random();
        int size = quizList.size();
        // 0 ~ size - 1의 값을 반환한다.
        int randomIdx = random.nextInt(size);
        return quizList.get(randomIdx);
    }

}
