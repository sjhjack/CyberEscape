package com.cyber.escape.domain.my_page.dto;

import com.cyber.escape.domain.rank.dto.RankingDto;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class MyPageDto {

    @Builder
    @Getter
    public static class InfoResponse{
        private final String nickname;
        private final String profileUrl;
        // 내 최고 기록
        private final RankingDto.UserRankingDto myBestRankingInfo;

        @Builder
        @QueryProjection
        public InfoResponse(String nickname, String profileUrl, RankingDto.UserRankingDto myBestRankingInfo){
            this.nickname = nickname;
            this.profileUrl = profileUrl;
            this.myBestRankingInfo = myBestRankingInfo;
        }

    }


    public static class ChangeProfileUrl{

    }


}
