package com.cyber.escape.domain.voice_chat.controller;


import com.cyber.escape.domain.voice_chat.dto.VoiceChatDto;
import com.cyber.escape.global.common.dto.ApiResponse;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.VoiceChatException;
import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@RestController
@Slf4j
@RequestMapping("/voice")
public class VoiceChatController {

    @Value("${openvidu.url}")
    private String OPENVIDU_URL;

    @Value("${openvidu.secret}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    private final ConcurrentHashMap<String, String> roomSessionInfo = new ConcurrentHashMap<>();

    @PostConstruct
    public void init(){
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }


    // 세션 초기화
    @PostMapping("/init/session")
    public ApiResponse initSession(@RequestBody(required = false) Map<String, Object> params) throws OpenViduJavaClientException, OpenViduHttpException {

        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);

        String roomUuid = (String) params.get("roomUuid");
        log.info("roomUUID : {}", roomUuid);

        if(roomUuid == null || roomUuid.isBlank())
            throw new VoiceChatException(ExceptionCodeSet.UUID_NOT_CORRECT);

        // 현재 roomUuid로 저장된 sessionId가 있다면
        String sessionId = roomSessionInfo.get(roomUuid) != null ? roomSessionInfo.get(roomUuid) : session.getSessionId();

        roomSessionInfo.put(roomUuid, sessionId);
        VoiceChatDto.SessionResDto sessionDto = VoiceChatDto.SessionResDto.builder().sessionId(sessionId).build();
        return new ApiResponse(HttpStatus.OK.value(), "보이스 채팅 세션이 만들어졌습니다.", sessionDto);
    }

    // 연결 생성
    // 해당 메서드에서 반환하는 토큰을 기반으로 사용자를 세션에 연결할 수 있음
    @PostMapping("/connection")
    public ApiResponse createConnection(@RequestBody Map<String, String> sessionInfo)
                                throws OpenViduHttpException, OpenViduJavaClientException{

        String sessionId = sessionInfo.get("sessionId") == null ? "" : sessionInfo.get("sessionId");
        Session session = openvidu.getActiveSession(sessionId);

        if(session == null){
            throw new VoiceChatException(ExceptionCodeSet.SESSION_ID_NOT_CORRECT);
        }

        ConnectionProperties properties = ConnectionProperties.fromJson(sessionInfo).build();
        Connection connection = session.createConnection(properties);

        // connection.getToken()
        VoiceChatDto.ConnectionResDto connectionResDto = VoiceChatDto.ConnectionResDto.builder().voiceChatToken(connection.getToken()).build();
        return new ApiResponse(HttpStatus.OK.value(), "보이스 채팅이 연결되었습니다.", connectionResDto);
    }


}
