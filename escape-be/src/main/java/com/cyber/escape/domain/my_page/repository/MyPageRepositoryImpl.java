package com.cyber.escape.domain.my_page.repository;

import com.cyber.escape.domain.my_page.dto.MyPageDto;
import com.cyber.escape.domain.my_page.dto.QMyPageDto_InfoResponse;
import com.cyber.escape.domain.rank.dto.QRankingDto_UserRankingDto;
import com.cyber.escape.domain.rank.entity.QRanking;
import com.cyber.escape.domain.user.entity.QUser;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

public class MyPageRepositoryImpl {

    private final JPAQueryFactory jpaQueryFactory;

    public MyPageRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public MyPageDto.InfoResponse getMyInfo(Long userId){
//
//        QUser user = QUser.user;
//        QRanking ranking = QRanking.ranking;
//
//        jpaQueryFactory
//                .select(new QMyPageDto_InfoResponse(
//                    user.nickname,
//                        user.profileUrl,
//                        new JPAExpressions
//                                .select(new QRankingDto_UserRankingDto(QRanking.ranking.thema, QRanking.ranking.bestTime))
//                                .from(ranking)
//                                .where(ranking.user.id.eq(userId))
//                ))
////
//
//        return null;

        return null;
    }

}
