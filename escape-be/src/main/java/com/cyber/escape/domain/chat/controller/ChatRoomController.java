package com.cyber.escape.domain.chat.controller;


import com.cyber.escape.domain.chat.dto.ChatRoomDto;
import com.cyber.escape.domain.chat.service.ChatRoomService;
import com.cyber.escape.global.common.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/chat")
public class ChatRoomController {

    private ChatRoomService chatRoomService;

    public ChatRoomController(ChatRoomService chatRoomService){
        this.chatRoomService = chatRoomService;
    }

    @PostMapping("")
    public ApiResponse createRoom(ChatRoomDto.ChatRoomReqDto req){
        return new ApiResponse(HttpStatus.CREATED.value(), "채팅방이 생성되었습니다.", chatRoomService.createChatRoom(req));
    }

    @PostMapping("/join")
    public ApiResponse joinRoom(ChatRoomDto.ChatRoomReqDto req){
        return new ApiResponse(HttpStatus.CREATED.value(), "채팅방에 참가하였습니다.", chatRoomService.createChatRoom(req));
    }


}
