package com.cyber.escape.domain.rank.controller;

import com.cyber.escape.domain.rank.dto.GameHistoryDto;
import com.cyber.escape.domain.rank.dto.RankingDto;
import com.cyber.escape.domain.rank.entity.Ranking;
import com.cyber.escape.domain.rank.service.GameHistoryService;
import com.cyber.escape.global.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
public class GameHistoryController {
    private final GameHistoryService gameHistoryService;

    @PostMapping("/rank/update")
    public ApiResponse<String> upload(@RequestBody GameHistoryDto.Request req){
        gameHistoryService.upload(req);
        log.info("upload");
        return new ApiResponse<>(HttpStatus.OK.value(), "게임정보 업로드 성공", "");
    }

    @PostMapping("/rankings")
    public ApiResponse<List<RankingDto.Response>> getAllRankingsByThemaUuid(@RequestBody RankingDto.GetRanking req) {
        List<RankingDto.Response> rankings = gameHistoryService.getAllRankingsByUuid(req);
        log.info("list complete");
        return new ApiResponse<>(HttpStatus.OK.value(), "테마별 랭킹 조회 성공", rankings);
    }

    @PostMapping("/rank/myrank")
    public ApiResponse<RankingDto.UserRankingDto> getMyRanking(@RequestBody RankingDto.GetMyRanking req){
        RankingDto.UserRankingDto ranking = gameHistoryService.getMyRankingByUuid(req);
        log.info("my ranking information is successfully readed");
        return new ApiResponse<>(HttpStatus.OK.value(), "나의 랭킹 조회 성공", ranking);
    }

}
