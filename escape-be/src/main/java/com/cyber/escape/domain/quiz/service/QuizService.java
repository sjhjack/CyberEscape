package com.cyber.escape.domain.quiz.service;

import com.cyber.escape.domain.quiz.data.QuizDataInRedis;
import com.cyber.escape.domain.quiz.data.QuizDataInRedis.*;
import com.cyber.escape.domain.quiz.dto.QuizAnswerDto;
import com.cyber.escape.domain.quiz.dto.QuizDto;
import com.cyber.escape.domain.quiz.entity.FinalAnswer;
import com.cyber.escape.domain.quiz.entity.Quiz;
import com.cyber.escape.domain.quiz.repository.FinalAnswerRepository;
import com.cyber.escape.domain.quiz.repository.QuizRepository;
import com.cyber.escape.domain.quiz.util.QuizMapper;
import com.cyber.escape.domain.thema.entity.Thema;
import com.cyber.escape.domain.user.util.UserUtil;
import com.cyber.escape.global.common.util.IdFinder;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.QuizException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.cache.CacheProperties;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
@Slf4j
public class QuizService {

    private QuizMapper quizMapper;
    private IdFinder idFinder;
    private QuizRepository quizRepository;
    private FinalAnswerRepository finalAnswerRepository;
    private RedisTemplate<String, Map<String, QuizDataInRedis.MapQuizWithClueData>> mappedClueWithQuiz;
    private RedisTemplate<String, QuizDataInRedis.finalAnswerData> finalAnswerStore;
//    private RedisTemplate<String, List<Boolean>> solvedQuiz;
    public QuizService(QuizRepository quizRepository,
                       FinalAnswerRepository finalAnswerRepository,
                       QuizMapper quizMapper,
                       IdFinder idFinder,
                       RedisTemplate<String, Map<String, QuizDataInRedis.MapQuizWithClueData>> mappedClueWithQuiz,
                       RedisTemplate<String, QuizDataInRedis.finalAnswerData> finalAnswerStore) {

        this.quizRepository = quizRepository;
        this.finalAnswerRepository = finalAnswerRepository;
        this.quizMapper = quizMapper;
        this.idFinder = idFinder;
        this.mappedClueWithQuiz = mappedClueWithQuiz;
        this.finalAnswerStore = finalAnswerStore;
    }

    // 퀴즈를 뽑는 로직
    // 여기서 주어지는 themaUuid는 설명 칸에 있는 uuid일 것이므로 무조건 role 정보가 필요함
    public List<QuizDto.SelectedQuizResDto> getQuizzes(String themaUuid, int role) throws QuizException{
        List<QuizDto.SelectedQuizResDto> result = new ArrayList<>();

        String userUuid = UserUtil.getUserUuid();

        Long themaId = idFinder.findIdByUuid(themaUuid, Thema.class) + role;
        log.info("themaId : {}", themaId);

        List<Quiz> quizList = quizRepository.getQuizzes(themaId)
                .orElseThrow(()-> new QuizException(ExceptionCodeSet.ENTITY_NOT_EXISTS));

        FinalAnswer finalAnswer = finalAnswerRepository.findRandomAnswer()
                .orElseThrow(()-> new QuizException(ExceptionCodeSet.ENTITY_NOT_EXISTS));

        // 레디스에 최종정답 및 현재 정답 정보 저장
        storeAnswersToRedis(userUuid, quizList, finalAnswer);

        result = quizList.stream().map(quizMapper::toDto).toList();

        return result;
    }

    public QuizAnswerDto.SubmitAnswerResDto getAnswer(QuizAnswerDto.SubmitAnswerReqDto req){
        String userUuid = UserUtil.getUserUuid();

        // 현재 제출한 퀴즈 데이터 불러오기
        Quiz quiz = quizRepository.findByUuid(req.getQuizUuid()).get();

        // 올바르지 않은 quizuuid
        if(quiz == null){
            throw new QuizException(ExceptionCodeSet.BAD_REQUEST);
        }

        String submitAnswer = req.getAnswer();
        String realAnswer = quiz.getAnswer();

        // 만일 답이 맞으면
        if(realAnswer.equals(submitAnswer)){
            log.info("answer : {}", realAnswer);

            Map<String, QuizDataInRedis.MapQuizWithClueData> data = mappedClueWithQuiz.opsForValue().get(userUuid);

            String finalUuid = data.get(quiz.getUuid()).getFinalUuid();
            String finalAnswer = finalAnswerStore.opsForValue().get(finalUuid).getFinalAnswer();
            String[] clues = makeClue(finalAnswer);

            for(int i = 0; i < 3; i++){
                log.info("clue : {}",clues[i]);
            }

            String clue = data.get(quiz.getUuid()).getClue();
            // 정답의 어순을 위한 데이터
            int order = data.get(quiz.getUuid()).getClueIdx();
            return QuizAnswerDto.SubmitAnswerResDto
                                .builder()
                                .clue(clue)
                                .order(order + 1)
                                .isRight(true)
                                .build();
        }

        return QuizAnswerDto.SubmitAnswerResDto
                .builder()
                .clue("")
                .order(-1)
                .isRight(false)
                .build();
    }

    private String[] makeClue(String answer){

        //log.info("answer : {}", answer);
        answer = answer.replace(" ", "").trim();

        String[] clue = new String[3];

        int size = answer.length();
        int wordSize = size / 3;

        int start = 0;
        int end = wordSize;

        clue[0] = answer.substring(start, end);
        //log.info("0 : {}", clue[0]);

        start = end;
        end = start + wordSize;
        clue[1] = answer.substring(start, start + wordSize);
        //log.info("1 : {}", clue[1]);

        start = end;
        end = start + wordSize + size % 3;
        clue[2] = answer.substring(start, end);
        //log.info("2 : {}", clue[2]);

        return clue;
    }

    private void storeAnswersToRedis(String userUuid, List<Quiz> quizList, FinalAnswer finalAnswer){

        log.info("FINAL QUIZ UUID : {}", finalAnswer.getUuid());
        // answer를 단어별로 자른다.
        String[] clues = makeClue(finalAnswer.getAnswer());

        // 레디스에 최종 정답 리스트 저장
        finalAnswerStore.opsForValue().set(finalAnswer.getUuid(),
                finalAnswerData.builder()
                        .finalAnswer(finalAnswer.getAnswer())
                        .build()
        );

        // 퀴즈별 클루 정보를 저장하기 위한 레디스
        Map<String, QuizDataInRedis.MapQuizWithClueData> map = new HashMap<>();

        int idx = 0;
        for(Quiz quiz : quizList){
            map.put(quiz.getUuid(), MapQuizWithClueData
                                    .builder()
                                    .finalUuid(finalAnswer.getUuid())
                                    .clueIdx(idx)
                                    .clue(clues[idx])
                                    .build());

            idx++;
        }

        mappedClueWithQuiz.opsForValue().set(userUuid, map);
    }

}
