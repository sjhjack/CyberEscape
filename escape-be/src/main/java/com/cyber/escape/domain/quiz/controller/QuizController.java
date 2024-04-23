package com.cyber.escape.domain.quiz.controller;


import com.cyber.escape.domain.quiz.dto.QuizDto;
import com.cyber.escape.domain.quiz.service.QuizService;
import com.cyber.escape.global.common.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/quiz")
public class QuizController {


    private final QuizService quizService;

    public QuizController(QuizService quizService){
        this.quizService = quizService;
    }

    @PostMapping("")
    public ApiResponse getQuizzez(@RequestBody QuizDto.RequestDto req){

        return new ApiResponse(HttpStatus.OK.value(), "퀴즈를 불러왔습니다.", quizService.getQuizzes(req.getThemaUuid()));
    }


}
