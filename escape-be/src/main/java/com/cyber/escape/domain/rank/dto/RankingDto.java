package com.cyber.escape.domain.rank.dto;

import com.cyber.escape.domain.thema.dto.ThemaDto;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;

import java.sql.Time;
import java.time.LocalTime;

public class RankingDto {
    @Getter
    @Builder
    public static class Request{
        private int themaCategory;
        private LocalTime bestTime;
    }

    @Getter
    @Builder
    public static class GetRanking{
        private int pageNumber;
        private int themaCategory;
//        public GetRanking(){
//        }
//        public GetRanking(String themaUuid){
//            this.themaUuid = themaUuid;
//        }
    }

    @Getter
    @Builder
    public static class GetMyRanking{
        private int themaCategory;

        public GetMyRanking(){
        }

        public GetMyRanking(int themaCategory){
            this.themaCategory = themaCategory;
        }
    }

    @Getter
    @Builder
    public static class Response{
        private int rank;
        private String nickname;
        private Time bestTime;
        private int category;
        private String profileUrl;
    }

    @Getter
    @Builder
    public static class UserRankingDto {
        private int rank;
        private String profileUrl;
        private String nickname;
        private Time bestTime;
        private ThemaDto.ThemaType thema;
    }

}
