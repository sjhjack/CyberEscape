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
    private RedisTemplate<String, QuizDataInRedis.QuizData> answerInfoStore;
    private RedisTemplate<String,QuizDataInRedis.finalAnswerData> finalAnswerStore;

    public QuizService(QuizRepository quizRepository,
                       FinalAnswerRepository finalAnswerRepository,
                       QuizMapper quizMapper,
                       IdFinder idFinder,
                       RedisTemplate<String, QuizDataInRedis.QuizData> answerInfoStore,
                       RedisTemplate<String, QuizDataInRedis.finalAnswerData> finalAnswerStore) {

        this.quizRepository = quizRepository;
        this.finalAnswerRepository = finalAnswerRepository;
        this.quizMapper = quizMapper;
        this.idFinder = idFinder;
        this.answerInfoStore = answerInfoStore;
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
        storeAnswersToRedis(quizList, finalAnswer);

        result = quizList.stream().map(quizMapper::toDto).toList();


        return result;
    }

    public QuizAnswerDto.SubmitAnswerResDto getAnswer(QuizAnswerDto.SubmitAnswerReqDto req){
        
        // 현재 제출한 퀴즈 데이터 불러오기
        QuizDataInRedis.QuizData data = answerInfoStore.opsForValue().get(req.getQuizUuid());

        // 올바르지 않은 quizuuid
        if(data == null){
            throw new QuizException(ExceptionCodeSet.BAD_REQUEST);
        }

        String submitAnswer = req.getAnswer();
        String realAnswer = data.getAnswer();

        // 만일 답이 맞으면
        if(realAnswer.equals(submitAnswer)){
            String finalQuizUuid = data.getFinalQuizUuid();
            // final 정답 일부를 전달한다.
            QuizDataInRedis.finalAnswerData finalQuiz = finalAnswerStore.opsForValue().get(finalQuizUuid);
            boolean[] isUsedArr = finalQuiz.getIsUsed();
            String clue = "";

            for(int clueIdx = 0; clueIdx < 3; clueIdx++){
                if(!isUsedArr[clueIdx]){
                    clue = finalQuiz.getClues()[clueIdx];
                    finalQuiz.getIsUsed()[clueIdx] = true;
                    break;
                }
            }

            // clue 상태 업데이트
            finalAnswerStore.opsForValue().set(finalQuizUuid, finalQuiz);

            return QuizAnswerDto.SubmitAnswerResDto
                                .builder()
                                .clue(clue)
                                .isRight(true)
                                .build();
        }

        return QuizAnswerDto.SubmitAnswerResDto
                .builder()
                .clue("")
                .isRight(false)
                .build();
    }

    private String[] makeClue(String answer){
        return answer.split(" ");
    }

    private void storeAnswersToRedis(List<Quiz> quizList, FinalAnswer finalAnswer){

        // 퀴즈 정보 캐싱 처리
        for(Quiz selectedQuiz : quizList){
            QuizDataInRedis.QuizData quizInfo = QuizDataInRedis.QuizData.builder()
                    .answer(selectedQuiz.getAnswer())
                    .hint(selectedQuiz.getHint())
                    .finalQuizUuid(finalAnswer.getUuid())
                    .build();
            // quiz 정보를 저장한다.

            answerInfoStore.opsForValue().set(selectedQuiz.getUuid(), quizInfo);
        }

        // answer를 단어별로 자른다.
        String[] clues = makeClue(finalAnswer.getAnswer());
        boolean[] isUsed = new boolean[]{false, false, false};

        // 레디스에 최종 정답 리스트 저장
        finalAnswerStore.opsForValue().set(finalAnswer.getUuid(),
                finalAnswerData.builder()
                        .finalAnswer(finalAnswer.getAnswer())
                        .clues(clues)
                        .isUsed(isUsed)
                        .build()
        );
    }

}
