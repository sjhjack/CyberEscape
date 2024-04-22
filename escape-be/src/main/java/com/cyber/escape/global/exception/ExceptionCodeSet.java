package com.cyber.escape.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ExceptionCodeSet {
    // 유저
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, 4040, "회원이 존재하지 않습니다."),

    NICKNAME_DUPLICATED(HttpStatus.CONFLICT, 4090, "이미 존재하는 닉네임입니다.");

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
