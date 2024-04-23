package com.cyber.escape.domain.rank.controller;

import com.cyber.escape.domain.rank.dto.GameHistoryDto;
import com.cyber.escape.domain.rank.service.GameHistoryService;
import com.cyber.escape.global.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class GameHistoryController {
    private final GameHistoryService gameHistoryService;

    @PostMapping("/rank/update")
    public ApiResponse<String> upload(@RequestBody GameHistoryDto.Request req){
        log.info("upload");
        return new ApiResponse<>(HttpStatus.OK.value(), "게임정도 업로드 성공", gameHistoryService.toString());
    }
}
