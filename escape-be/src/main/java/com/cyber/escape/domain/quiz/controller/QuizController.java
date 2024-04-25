package com.cyber.escape.domain.quiz.controller;


import com.cyber.escape.domain.quiz.dto.QuizAnswerDto;
import com.cyber.escape.domain.quiz.dto.QuizDto;
import com.cyber.escape.domain.quiz.service.QuizService;
import com.cyber.escape.global.common.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/game/quiz")
public class QuizController {


    private final QuizService quizService;

    public QuizController(QuizService quizService){
        this.quizService = quizService;
    }

    @PostMapping("")
    public ApiResponse getQuizzes(@RequestBody QuizDto.QuizSubmissionReqDto submission){

        return new ApiResponse(HttpStatus.OK.value(), "퀴즈를 불러왔습니다.", quizService.getQuizzes(submission.getThemaUuid(), submission.getRole()));
    }

    @PostMapping("/hint")
    public ApiResponse<String> getHint(@RequestBody QuizDto.QuizHintReqDto hintDto){
        return new ApiResponse(HttpStatus.OK.value(), "힌트를 불러왔습니다.", quizService.getHint(hintDto.getQuizUuid()));
    }



    @PostMapping("/answer")
    public ApiResponse submitAnswer(@RequestBody QuizAnswerDto.SubmitAnswerReqDto submit){

        return new ApiResponse(HttpStatus.OK.value(), "정답 여부를 전송합니다.", quizService.getAnswer(submit));
    }

    @PostMapping("/final/answer")
    public ApiResponse submitfinalAnswer(@RequestBody QuizAnswerDto.SubmitAnswerReqDto submit){

        return new ApiResponse(HttpStatus.OK.value(), "정답 여부를 전송합니다.", quizService.getAnswer(submit));
    }


}
