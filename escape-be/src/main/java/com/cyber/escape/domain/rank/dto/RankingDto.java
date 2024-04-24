package com.cyber.escape.domain.rank.dto;

import lombok.Builder;
import lombok.Getter;

import java.sql.Time;
import java.time.LocalTime;

public class RankingDto {
    @Getter
    @Builder
    public static class Request{
        private String userUuid;
        private String themaUuid;
        private LocalTime bestTime;
    }

    @Getter
    @Builder
    public static class GetRanking{
        private String userUuid;
        private String themaUuid;
//        public GetRanking(){
//        }
//        public GetRanking(String themaUuid){
//            this.themaUuid = themaUuid;
//        }
    }

    @Getter
    @Builder
    public static class GetMyRanking{
        private String userUuid;
        private String themaUuid;
    }

    @Getter
    @Builder
    public static class Response{
        private int rank;
        private String nickname;
        private Time bestTime;
        private int category;
    }

    @Getter
    @Builder
    public static class UserRankingDto {
        private String nickname;
        private Time bestTime;
        private int category;
    }
}
