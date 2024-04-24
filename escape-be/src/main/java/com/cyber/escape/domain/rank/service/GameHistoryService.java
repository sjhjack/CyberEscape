package com.cyber.escape.domain.rank.service;

import com.cyber.escape.domain.rank.dto.GameHistoryDto;
import com.cyber.escape.domain.rank.dto.RankingDto;
import com.cyber.escape.domain.rank.entity.GameHistory;
import com.cyber.escape.domain.rank.entity.Ranking;
import com.cyber.escape.domain.rank.repository.GameHistoryRepository;
import com.cyber.escape.domain.rank.repository.RankingRepository;
import com.cyber.escape.domain.thema.entity.Thema;
import com.cyber.escape.domain.thema.repository.ThemaRepository;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameHistoryService {
    private final GameHistoryRepository gameHistoryRepository;
    private final UserRepository userRepository;
    private final ThemaRepository themaRepository;
    private final RankingRepository rankingRepository;

    @Transactional
    public void upload(GameHistoryDto.Request gameHistoryDto){ // 게임 결과 모든 데이터 저장

        User user = userRepository.findUserByUuid(gameHistoryDto.getUserUuid())
                .orElseThrow(() -> new RuntimeException("일치하는 사용자 없음"));

        Thema thema = themaRepository.findByUuid(gameHistoryDto.getThemaUuid())
                .orElseThrow(() -> new RuntimeException("일치하는 테마 없음"));

        GameHistory gameHistory = GameHistory.builder()
                .user(user)
                .thema(thema)
                .clearTime(gameHistoryDto.getClearTime())
                .build();
        gameHistoryRepository.save(gameHistory);
        //조건문 최고기록 넘는지?

        String userUuid = user.getUuid();
        String themaUuid = thema.getUuid();

        Optional<Ranking> existingRanking = rankingRepository.findByUserUuidAndThemaUuid(userUuid, themaUuid);
        if (existingRanking.isPresent()) {
            Ranking ranking = existingRanking.get();
            // 최고 기록을 갱신해야 하는지 확인
            if (gameHistory.getClearTime().isBefore(ranking.getBestTime())) {
                ranking.setBestTime(gameHistory.getClearTime());
                rankingRepository.save(ranking);
            }
        } else {
            // 랭킹 정보가 없으면 새로 생성
            Ranking newRanking = Ranking.builder()
                    .user(user)
                    .thema(thema)

                    .bestTime(gameHistory.getClearTime())
                    .build();
            rankingRepository.save(newRanking);
        }
    }
//    public List<Ranking> getAllRankingsByThemaUuid(String themaUuid) {
//        return rankingRepository.findAllByThemaUuidOrderByBestTimeAsc(themaUuid);
//    }

//    public List<RankingDto.Response> getAllRankingsByThemaUuid(RankingDto.GetRanking req) {
//        List<Object> rankings = rankingRepository.findAllByThemaUuidOrderByBestTimeAsc(req.getThemaUuid());
//
//        return null;
//    }

    public List<RankingDto.Response> getAllRankingsByThemaUuid(RankingDto.GetRanking req) {
        List<Object> rankingObjects = rankingRepository.findAllByThemaUuidOrderByBestTimeAsc(req.getThemaUuid());
        List<RankingDto.Response> rankings = new ArrayList<>();

        for (Object obj : rankingObjects) {
            Object[] arr = (Object[]) obj;
            String nickname = (String) arr[0];
            Time bestTime = (Time) arr[1];
            int category = (int) arr[2];

            RankingDto.Response dto = RankingDto.Response.builder()
                    .nickname(nickname)
                    .bestTime(bestTime)
                    .category(category)
                    .build();

            rankings.add(dto);
        }

        return rankings;
    }
}
