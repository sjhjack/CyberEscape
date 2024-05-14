package com.cyber.escape.domain.quiz.controller;


import com.cyber.escape.domain.quiz.dto.QuizAnswerDto;
import com.cyber.escape.domain.quiz.dto.QuizDto;
import com.cyber.escape.domain.quiz.service.QuizService;
import com.cyber.escape.global.common.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/game/quiz")
public class QuizController {
    private final QuizService quizService;

    public QuizController(QuizService quizService){
        this.quizService = quizService;
    }

    @GetMapping("/{themaId}")
    public ApiResponse getQuizzes(@PathVariable("themaId") int themaId){

        return new ApiResponse(HttpStatus.OK.value(), "퀴즈를 불러왔습니다.", quizService.getQuizzes(themaId));
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

        return new ApiResponse(HttpStatus.OK.value(), "최종 정답 여부를 전송합니다.", quizService.getResult(submit));
    }

    @PostMapping("/data")
    public ApiResponse putDummyData(
            @RequestPart(name = "req") QuizDto.Request req,
            @RequestPart(name = "file", required = true) MultipartFile file) throws IOException {
        return new ApiResponse(HttpStatus.OK.value(), "퀴즈 더미 데이터를 성공적으로 불러왔습니다.", quizService.putDummyData(req, file));
    }


}
