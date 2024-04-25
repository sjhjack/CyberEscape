package com.cyber.escape.global.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(QuizException.class)
    public ResponseEntity<ErrorResponse> handleMemberException(QuizException e) {
        return makeResponseFormat(e.getExceptionCode());
    }

    @ExceptionHandler(RankingException.class)
    public ResponseEntity<ErrorResponse> handleRecruitmentException(RankingException e) {
        return makeResponseFormat(e.getExceptionCode());
    }

    private ResponseEntity<ErrorResponse> makeResponseFormat(ExceptionCodeSet exceptionCode) {
        System.out.println("msg : " + exceptionCode.getMessage());
        return ResponseEntity.status(exceptionCode.getHttpStatus())
                .body(ErrorResponse.builder()
                        .status(exceptionCode.getStatus())
                        .message(exceptionCode.getMessage())
                        .build()
                );
    }

}
