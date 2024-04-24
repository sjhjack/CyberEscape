package com.cyber.escape.domain.quiz.service;

import com.cyber.escape.domain.quiz.dto.QuizAnswerDto;
import com.cyber.escape.domain.quiz.dto.QuizDto;
import com.cyber.escape.domain.quiz.entity.FinalAnswer;
import com.cyber.escape.domain.quiz.entity.Quiz;
import com.cyber.escape.domain.quiz.repository.FinalAnswerRepository;
import com.cyber.escape.domain.quiz.repository.QuizRepository;
import com.cyber.escape.domain.quiz.util.QuizMapper;
import com.cyber.escape.domain.thema.entity.Thema;
import com.cyber.escape.global.common.util.IdFinder;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.QuizException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;


@Service
@Slf4j
public class QuizService {

    private QuizMapper quizMapper;
    private IdFinder idFinder;
    private QuizRepository quizRepository;
    private FinalAnswerRepository finalAnswerRepository;
    private RedisTemplate<String, String> answerStore;

    public QuizService(QuizRepository quizRepository,
                       FinalAnswerRepository finalAnswerRepository,
                       QuizMapper quizMapper,
                       IdFinder idFinder,
                       RedisTemplate<String, String> answerStore) {

        this.quizRepository = quizRepository;
        this.finalAnswerRepository = finalAnswerRepository;
        this.quizMapper = quizMapper;
        this.idFinder = idFinder;
        this.answerStore = answerStore;
    }

    // 퀴즈를 뽑는 로직
    // 여기서 주어지는 themaUuid는 설명 칸에 있는 uuid일 것이므로 무조건 role 정보가 필요함
    public List<QuizDto.SelectedQuizResDto> getQuizzes(String themaUuid, int role) throws QuizException{
        List<QuizDto.SelectedQuizResDto> result = new ArrayList<>();

        Long themaId = idFinder.findIdByUuid(themaUuid, Thema.class) + role;
        log.info("themaId : {}", themaId);

        List<Quiz> quizList = quizRepository.getQuizzes(themaId)
                .orElseThrow(()-> new QuizException(ExceptionCodeSet.ENTITY_NOT_EXISTS));

        result = quizList.stream().map(quizMapper::toDto).toList();
        // 최종 정답 선택하는 로직 추가
        FinalAnswer finalAnswer = finalAnswerRepository.findRandomAnswer().get();
        // 레디스에 최종 정답을 저장
        answerStore.opsForValue().set(finalAnswer.getUuid(), finalAnswer.getAnswer());

        return result;
    }

//    public QuizAnswerDto.SubmitAnswerResDto getAnswer(QuizAnswerDto.SubmitAnswerReqDto req){
//
//        Quiz quizInfo = quizRepository.findByUuid(req.getQuizUuid())
//                .orElseThrow(() -> new QuizException(ExceptionCodeSet.ENTITY_NOT_EXISTS));
//
//        String submitAnswer = req.getAnswer();
//        String realAnswer = quizInfo.getAnswer();
//
//        if(realAnswer.equals(submitAnswer)){
//
//            return QuizAnswerDto.SubmitAnswerResDto
//                                .builder()
//                                .build();
//        }
//
//    }

}
