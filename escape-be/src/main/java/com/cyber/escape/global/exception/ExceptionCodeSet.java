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
    SESSION_ID_NOT_CORRECT(HttpStatus.BAD_REQUEST, 4003, "세션 아이디가 잘못 되었습니다."),
    SESSION_NOT_CORRECT(HttpStatus.BAD_REQUEST, 4004, "세션이 잘못 되었습니다."),
    UUID_NOT_CORRECT(HttpStatus.BAD_REQUEST, 4005, "uuid가 잘못 되었습니다."),
    ALREADY_FRIEND(HttpStatus.BAD_REQUEST, 4006, "이미 친구 사이 입니다."),
    NO_SELF_FRIEND(HttpStatus.BAD_REQUEST, 4007, "자기 자신과는 친구가 될 수 없습니다."),

    USER_NOT_FOUND(HttpStatus.NOT_FOUND, 4040, "회원이 존재하지 않습니다."),
    RANKING_NOT_FOUND(HttpStatus.NOT_FOUND, 4041, "랭킹 정보가 존재하지 않습니다."),

    NICKNAME_DUPLICATED(HttpStatus.CONFLICT, 4090, "이미 존재하는 닉네임입니다."),
    LOGINID_DUPLICATED(HttpStatus.NOT_FOUND, 4091, "이미 존재하는 아이디입니다."),
    INVALID_LOGINID_FORMAT(HttpStatus.BAD_REQUEST, 4092, "아이디 형식이 올바르지 않습니다."),
    INVALID_PASSWORD_FORMAT(HttpStatus.BAD_REQUEST, 4093, "비밀번호 형식이 올바르지 않습니다."),

    ENTITY_NOT_EXISTS(HttpStatus.INTERNAL_SERVER_ERROR, 5000, "정보가 존재하지 않습니다."),

    // 토큰
    TOKEN_NOT_EXISTS(HttpStatus.INTERNAL_SERVER_ERROR, 6000, "토큰이 존재하지 않습니다."),
    TOKEN_EXPIRED(HttpStatus.INTERNAL_SERVER_ERROR, 6001, "유효기간 만료된 토큰입니다."),

    // 파일
    FILE_NOT_EXISTS(HttpStatus.BAD_REQUEST, 7000, "파일이 존재하지 않습니다."),
    FILE_NAME_TOO_LONG(HttpStatus.BAD_REQUEST, 7001, "파일 이름이 너무 깁니다."),
    FILE_DUPLICATED(HttpStatus.CONFLICT, 7002, "현재 지정된 파일입니다."),
    DELETE_DEFAULT_FILE(HttpStatus.BAD_REQUEST, 7003, "기본 파일은 삭제할 수 없습니다."),

    // 대기방
    ROOM_PASSWORD_MISMATCH(HttpStatus.BAD_REQUEST, 8000, "대기방 비밀번호가 일치하지 않습니다."),
    ROOM_CAPACITY_OVER(HttpStatus.BAD_REQUEST, 8001, "대기방 정원 초과로 인해 입장할 수 없습니다."),
    ROOM_NOT_HOST(HttpStatus.BAD_REQUEST, 8002, "방장이 아닙니다."),
    ROOM_NOT_FOUND(HttpStatus.BAD_REQUEST, 8003, "존재하지 않는 대기방입니다."),
    ROOM_GUEST_NOT_FOUND(HttpStatus.BAD_REQUEST, 8004, "게스트가 존재하지 않습니다."),
    ROOM_INVALID_USER(HttpStatus.BAD_REQUEST, 8004, "대기방에 존재하지 않는 참여자입니다.")
    ;

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
