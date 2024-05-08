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
    private UserUtil userUtil;
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
    public List<QuizDto.QuizSubmissionResDto> getQuizzes(String themaUuid, int role) throws QuizException{
        List<QuizDto.QuizSubmissionResDto> result = new ArrayList<>();

        String userUuid = userUtil.getLoginUserUuid();

        Long themaId = idFinder.findIdByUuid(themaUuid, Thema.class) + role;
        log.info("themaId : {}", themaId);

        List<Quiz> quizList = quizRepository.getQuizzes(themaId)
                .orElseThrow(()-> new QuizException(ExceptionCodeSet.ENTITY_NOT_EXISTS));

        FinalAnswer finalAnswer = finalAnswerRepository.findRandomAnswer()
                .orElseThrow(()-> new QuizException(ExceptionCodeSet.ENTITY_NOT_EXISTS));

        // 레디스에 최종정답 및 현재 정답 정보 저장
        storeAnswersToRedis(userUuid, quizList, finalAnswer);

        for(Quiz q : quizList){
            result.add(quizMapper.toDto(q));
        }
        //result = quizList.stream().map(quizMapper::toDto).toList();
        result.add(new QuizDto.QuizSubmissionResDto(finalAnswer.getUuid(), "마지막 문제입니다. 풀고 탈출하세요.", "", 4));

        return result;

    }

    public QuizAnswerDto.SubmitAnswerResDto getAnswer(QuizAnswerDto.SubmitAnswerReqDto req){
        String userUuid = userUtil.getLoginUserUuid();

        // 현재 제출한 퀴즈 데이터 불러오기
        Quiz quiz = quizRepository.findByUuid(req.getQuizUuid())
                .orElseThrow(() -> new QuizException(ExceptionCodeSet.ENTITY_NOT_EXISTS));

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

    public QuizDto.QuizHintResDto getHint(String quizUuid){
        String userUuid = userUtil.getLoginUserUuid();

        Map<String, QuizDataInRedis.MapQuizWithClueData> map = mappedClueWithQuiz.opsForValue().get(userUuid);

        // quiz uuid로 데이터를 꺼낸다.
        QuizDataInRedis.MapQuizWithClueData data = map.get(quizUuid);

        // 이미 힌트를 썼으면
        if(data.isUsedHint()){
            throw new QuizException(ExceptionCodeSet.ALREADY_USE_HINT);
        }

        // redis에 힌트 사용 여부를 저장한다.
        for(Map.Entry<String, QuizDataInRedis.MapQuizWithClueData> quizInfo : map.entrySet()){
            MapQuizWithClueData clueData = quizInfo.getValue();
            clueData.setUsedHint(true);
        }

        map.replace(quizUuid, data);
        mappedClueWithQuiz.opsForValue().set(userUuid, map);

        String hint = quizRepository.findByUuid(quizUuid).get().getHint();

        return QuizDto.QuizHintResDto.builder().hint(hint).build();
    }

    public QuizAnswerDto.SubmitFinalAnswerResDto getResult(QuizAnswerDto.SubmitAnswerReqDto req){

        finalAnswerData answerInfo = finalAnswerStore.opsForValue().get(req.getQuizUuid());

        if(answerInfo == null)
            throw new QuizException(ExceptionCodeSet.ENTITY_NOT_EXISTS);

        // 공백 문자 제거
        String submitAnswer = req.getAnswer().replace(" ", "").trim();
        String realAnswer = answerInfo.getFinalAnswer().replace(" ", "").trim();

        if(realAnswer.equals(submitAnswer)){
            String userUuid = userUtil.getLoginUserUuid();

            // 레디스에서 유저가 풀던 문제 삭제
            mappedClueWithQuiz.delete(userUuid);

            return QuizAnswerDto.SubmitFinalAnswerResDto.
                    builder()
                    .right(true)
                    .build();
        }
        return QuizAnswerDto.SubmitFinalAnswerResDto.
                builder()
                .right(false)
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
