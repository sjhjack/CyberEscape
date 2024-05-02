package com.cyber.escape.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ExceptionCodeSet {
    // 유저

    BAD_REQUEST(HttpStatus.BAD_REQUEST, 4000, "잘못된 접근입니다."),
    ALREADY_SOLVED_QUIZ(HttpStatus.BAD_REQUEST, 4001, "이미 푼 문제입니다."),
    ALREADY_USE_HINT(HttpStatus.BAD_REQUEST, 4002, "힌트 사용 횟수를 초과했습니다"),

    USER_NOT_FOUND(HttpStatus.NOT_FOUND, 4040, "회원이 존재하지 않습니다."),
    RANKING_NOT_FOUND(HttpStatus.NOT_FOUND, 4041, "랭킹 정보가 존재하지 않습니다."),

    NICKNAME_DUPLICATED(HttpStatus.CONFLICT, 4090, "이미 존재하는 닉네임입니다."),

    ENTITY_NOT_EXISTS(HttpStatus.INTERNAL_SERVER_ERROR, 5000, "정보가 존재하지 않습니다."),

    TOKEN_NOT_EXISTS(HttpStatus.INTERNAL_SERVER_ERROR, 6000, "토큰이 존재하지 않습니다.");


    private final HttpStatus httpStatus;
    private final Integer status;
    private final String message;
    public static ExceptionCodeSet findExceptionByCode(String code) {
        for (ExceptionCodeSet exceptionCode : ExceptionCodeSet.values()) {
            if (exceptionCode.getStatus().equals(code)) return exceptionCode;
        }
        return null;
    }

}
