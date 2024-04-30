package com.cyber.escape.domain.chat.controller;


import com.cyber.escape.domain.chat.dto.ChatRoomDto;
import com.cyber.escape.domain.chat.service.ChatRoomService;
import com.cyber.escape.global.common.dto.ApiResponse;
import com.cyber.escape.global.exception.ChatException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    public ChatRoomController(ChatRoomService chatRoomService){
        this.chatRoomService = chatRoomService;
    }

    @PostMapping("")
    public ApiResponse<ChatRoomDto.CreateChatRoomResDto> createRoom(@RequestBody ChatRoomDto.CreateChatRoomReqDto req) throws ChatException {
        return new ApiResponse(HttpStatus.CREATED.value(), "채팅방이 생성되었습니다.", chatRoomService.createChatRoom(req));
    }

    @PostMapping("/room/exit")
    public ApiResponse exitRoom(@RequestBody ChatRoomDto.ExitChatRoomReqDto req) throws ChatException{
        return new ApiResponse(HttpStatus.OK.value(), "채팅방을 나왔습니다.", chatRoomService.exitRoom(req));
    }

    @PostMapping("/room/mylist")
    public ApiResponse getMyChatList(){
        return new ApiResponse(HttpStatus.OK.value(), "내가 참가한 채팅방 리스트와 참가자 정보입니다.", chatRoomService.getMyChatList());
    }




}
