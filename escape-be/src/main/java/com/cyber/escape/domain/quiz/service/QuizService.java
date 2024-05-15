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
import com.cyber.escape.domain.thema.repository.ThemaRepository;
import com.cyber.escape.domain.user.util.UserUtil;
import com.cyber.escape.global.common.enums.FileType;
import com.cyber.escape.global.common.util.FileUtil;
import com.cyber.escape.global.common.util.IdFinder;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.QuizException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;


@Service
@Slf4j
public class QuizService {

    private final QuizMapper quizMapper;
    private final IdFinder idFinder;
    private final QuizRepository quizRepository;
    private final ThemaRepository themaRepository;
    private final FinalAnswerRepository finalAnswerRepository;
    private final RedisTemplate<String, Map<String, QuizDataInRedis.MapQuizWithClueData>> mappedClueWithQuiz;
    private final RedisTemplate<String, QuizDataInRedis.finalAnswerData> finalAnswerStore;
//    private RedisTemplate<String, List<Boolean>> solvedQuiz;
    private final UserUtil userUtil;
    public QuizService(QuizRepository quizRepository,
                       FinalAnswerRepository finalAnswerRepository,
                       QuizMapper quizMapper,
                       IdFinder idFinder, ThemaRepository themaRepository,
                       RedisTemplate<String, Map<String, QuizDataInRedis.MapQuizWithClueData>> mappedClueWithQuiz,
                       RedisTemplate<String, QuizDataInRedis.finalAnswerData> finalAnswerStore, UserUtil userUtil) {

        this.quizRepository = quizRepository;
        this.finalAnswerRepository = finalAnswerRepository;
        this.quizMapper = quizMapper;
        this.idFinder = idFinder;
        this.themaRepository = themaRepository;
        this.mappedClueWithQuiz = mappedClueWithQuiz;
        this.finalAnswerStore = finalAnswerStore;
        this.userUtil = userUtil;
    }

    // 퀴즈를 뽑는 로직
    // 여기서 주어지는 themaUuid는 설명 칸에 있는 uuid일 것이므로 무조건 role 정보가 필요함
    public List<QuizDto.QuizSubmissionResDto> getQuizzes(int category) throws QuizException{
        List<QuizDto.QuizSubmissionResDto> result = new ArrayList<>();

        String userUuid = userUtil.getLoginUserUuid();

        List<Quiz> diff1 = quizRepository.getQuizzezByCategory(category, 1)
                .orElseThrow(() -> new QuizException(ExceptionCodeSet.ENTITY_NOT_EXISTS));

        List<Quiz> diff2 = quizRepository.getQuizzezByCategory(category, 2)
                .orElseThrow(() -> new QuizException(ExceptionCodeSet.ENTITY_NOT_EXISTS));

        List<Quiz> diff3 = quizRepository.getQuizzezByCategory(category, 3)
                .orElseThrow(() -> new QuizException(ExceptionCodeSet.ENTITY_NOT_EXISTS));

        List<Quiz> quizList = new ArrayList<>();

        quizList.add(getRandomQuiz(diff1));
        quizList.add(getRandomQuiz(diff2));
        quizList.add(getRandomQuiz(diff3));

        FinalAnswer finalAnswer = finalAnswerRepository.findRandomAnswer()
                .orElseThrow(()-> new QuizException(ExceptionCodeSet.ENTITY_NOT_EXISTS));

        // 레디스에 최종정답 및 현재 정답 정보 저장
        storeAnswersToRedis(userUuid, quizList, finalAnswer);

        for(Quiz quiz : quizList){
            result.add(quizMapper.toDto(quiz));
        }
        //result = quizList.stream().map(quizMapper::toDto).toList();
        result.add(new QuizDto.QuizSubmissionResDto(finalAnswer.getUuid(), "마지막 문제입니다. 풀고 탈출하세요.", "", 4));

        return result;
    }

    public Quiz getRandomQuiz(List<Quiz> quizList){
            Random random = new Random();

            int size = quizList.size();

            // 0 ~ size - 1의 값을 반환한다.
            int randomIdx = random.nextInt(size);
            return quizList.get(randomIdx);
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

    public String putDummyData(QuizDto.Request quiz, MultipartFile multipartFile) throws IOException {
        String originalFileName = multipartFile.getOriginalFilename();
        String savedFileName = FileUtil.makeFileName(originalFileName);
        String quizUrl = FileUtil.uploadFile(multipartFile, FileType.quiz, savedFileName);

        log.info("originalFileName : {}, savedFileName : {}, quizUrl : {}", originalFileName, savedFileName, quizUrl);

        quizRepository.save(createQuiz(quiz, quizUrl));

        return quizUrl;
    }

    public Quiz createQuiz(QuizDto.Request quiz, String quizUrl){

        Thema thema = themaRepository.findByCategory(quiz.getThemaCategory())
                .orElseThrow(() -> new QuizException(ExceptionCodeSet.BAD_REQUEST));

        return Quiz
                .builder()
                .thema(thema)
                .hint(quiz.getHint())
                .answer(quiz.getAnswer())
                .difficulty(quiz.getDifficulty())
                .url(quizUrl)
                .build();
    }

}
