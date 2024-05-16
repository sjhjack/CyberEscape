package com.cyber.escape.global.exception;

import com.cyber.escape.global.common.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(QuizException.class)
    public ApiResponse handleQuizException(QuizException e) {
        return makeResponseFormat(e.getExceptionCode());
    }


    @ExceptionHandler(ChatException.class)
    public ApiResponse handleChatException(ChatException e) {
        return makeResponseFormat(e.getExceptionCode());
    }

    @ExceptionHandler(FileException.class)
    public ApiResponse handleFileException(FileException e) {
        return makeResponseFormat(e.getExceptionCode());
    }

    @ExceptionHandler(VoiceChatException.class)
    public ApiResponse handleVoiceChatException(VoiceChatException e) {
        return makeResponseFormat(e.getExceptionCode());
    }


    @ExceptionHandler(RankingException.class)
    public ApiResponse handleRecruitmentException(RankingException e) {
        return makeResponseFormat(e.getExceptionCode());
    }

    @ExceptionHandler(TokenException.class)
    public ApiResponse handleTokenException(TokenException e) {
        return makeResponseFormat(e.getExceptionCode());
    }

    @ExceptionHandler(UserException.class)
    public ApiResponse handleUserException(UserException e) {
        return makeResponseFormat(e.getExceptionCode());
    }

    @ExceptionHandler(RoomException.class)
    public ApiResponse handleRoomException(RoomException e) {
        return makeResponseFormat(e.getExceptionCode());
    }

    private ApiResponse makeResponseFormat(ExceptionCodeSet exceptionCode) {
        System.out.println("msg : " + exceptionCode.getMessage());
        return ApiResponse.error(exceptionCode.getStatus(), exceptionCode.getMessage());
    }

}
