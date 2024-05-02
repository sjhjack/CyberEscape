package com.cyber.escape.domain.voice_chat.controller;


import com.cyber.escape.domain.voice_chat.dto.VoiceChatDto;
import com.cyber.escape.global.common.dto.ApiResponse;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.VoiceChatException;
import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
@RequestMapping("/voice")
public class VoiceChatController {

    @Value("${openvidu.url}")
    private String OPENVIDU_URL;

    @Value("${openvidu.secret}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init(){
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }


    // 세션 초기화
    @PostMapping("/session")
    public ApiResponse initSession(@RequestBody(required = false) Map<String, Object> params) throws OpenViduJavaClientException, OpenViduHttpException {

        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);

        // sessionId를 보낸다.

        VoiceChatDto.SessionResDto sessionDto = VoiceChatDto.SessionResDto.builder().sessionId(session.getSessionId()).build();
        return new ApiResponse(HttpStatus.OK.value(), "보이스 채팅 세션이 만들어졌습니다.", sessionDto);
    }

    // 연결 생성
    // 해당 메서드에서 반환하는 토큰을 기반으로 사용자를 세션에 연결할 수 있음
    @PostMapping("/connection")
    public ApiResponse createConnection(@RequestBody Map<String, String> sessionInfo) throws
            OpenViduHttpException, OpenViduJavaClientException{

        Session session = openvidu.getActiveSession(sessionInfo.get("sessionId"));

        if(session == null){
            throw new VoiceChatException(ExceptionCodeSet.SESSION_NOT_CORRECT);
        }

        ConnectionProperties properties = ConnectionProperties.fromJson(sessionInfo).build();
        Connection connection = session.createConnection(properties);

        // connection.getToken()
        VoiceChatDto.ConnectionResDto connectionResDto = VoiceChatDto.ConnectionResDto.builder().voiceChatToken(connection.getToken()).build();
        return new ApiResponse(HttpStatus.OK.value(), "보이스 채팅이 연결되었습니다.", connectionResDto);
    }


}
