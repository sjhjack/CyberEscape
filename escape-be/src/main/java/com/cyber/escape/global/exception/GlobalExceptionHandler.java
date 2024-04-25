package com.cyber.escape.global.exception;

import com.cyber.escape.global.common.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(QuizException.class)
    public ApiResponse handleMemberException(QuizException e) {
        return makeResponseFormat(e.getExceptionCode());
    }

    @ExceptionHandler(RankingException.class)
    public ApiResponse handleRecruitmentException(RankingException e) {
        return makeResponseFormat(e.getExceptionCode());
    }

    private ApiResponse makeResponseFormat(ExceptionCodeSet exceptionCode) {
        System.out.println("msg : " + exceptionCode.getMessage());
        return ApiResponse.error(exceptionCode.getStatus(), exceptionCode.getMessage());
    }

}
