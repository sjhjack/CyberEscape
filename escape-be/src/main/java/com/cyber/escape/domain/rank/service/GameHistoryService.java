package com.cyber.escape.domain.rank.service;

import com.cyber.escape.domain.rank.dto.GameHistoryDto;
import com.cyber.escape.domain.rank.dto.RankingDto;
import com.cyber.escape.domain.rank.entity.GameHistory;
import com.cyber.escape.domain.rank.entity.Ranking;
import com.cyber.escape.domain.rank.repository.GameHistoryRepository;
import com.cyber.escape.domain.rank.repository.RankingRepository;
import com.cyber.escape.domain.thema.dto.ThemaDto;
import com.cyber.escape.domain.thema.entity.Thema;
import com.cyber.escape.domain.thema.repository.ThemaRepository;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;
import com.cyber.escape.domain.user.util.UserUtil;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.RankingException;
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
    private final UserUtil userUtil;

    @Transactional
    public void upload(GameHistoryDto.Request gameHistoryDto){ // 게임 결과 모든 데이터 저장

        String currentUserUuid = userUtil.getLoginUserUuid();
        User user = userRepository.findUserByUuid(currentUserUuid)
                .orElseThrow(() -> new RuntimeException("일치하는 사용자 없음"));

        Thema thema = themaRepository.findByCategory(gameHistoryDto.getThemaCategory())
                .orElseThrow(() -> new RuntimeException("일치하는 테마 없음"));
        GameHistory gameHistory = GameHistory.builder()
                .user(user)
                .thema(thema)
                .clearTime(gameHistoryDto.getClearTime())
                .build();
        gameHistoryRepository.save(gameHistory);
        //조건문 최고기록 넘는지?

        String userUuid = user.getUuid();
        int themaCategory = thema.getCategory();

        Optional<Ranking> existingRanking = rankingRepository.findByUserUuidAndThemaCategory(userUuid, themaCategory);
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

    public List<RankingDto.Response> getAllRankingsByUuid(RankingDto.GetRanking req) {//해당 테마 랭킹 불러오기
        // 요청한 페이지 번호에 해당하는 시작 인덱스 계산
        int pageNumber = req.getPageNumber();
        int pageSize = 20;
        int startIndex = (pageNumber - 1) * pageSize;


        //전체 랭킹
        List<Object> rankingObjects = rankingRepository.findAllByCategoryOrderByBestTimeAsc(req.getThemaCategory());

        List<RankingDto.Response> rankings = new ArrayList<>();
        int rank = startIndex + 1;
        int endIndex = Math.min(startIndex + pageSize, rankingObjects.size());
        int rankCount = 0;
        Time prevTime = Time.valueOf("00:00:00");

        for (int i = startIndex; i < endIndex; i++) {
            Object[] arr = (Object[]) rankingObjects.get(i);
            String nickname = (String) arr[0];
            Time bestTime = (Time) arr[1];
            int category = (int) arr[2];
            String profileUrl = (String) arr[3];

            if (prevTime.equals(bestTime)) {
                rank--;
                rankCount++;
            } else {
                prevTime = bestTime;
                if (rankCount != 0) {
                    rank += rankCount;
                    rankCount = 0;
                }
            }

            RankingDto.Response dto = RankingDto.Response.builder()
                    .rank(rank++)
                    .nickname(nickname)
                    .profileUrl(profileUrl)
                    .bestTime(bestTime)
                    .category(category)
                    .build();

            rankings.add(dto);
        }
        return rankings;
    }

    public RankingDto.UserRankingDto getMyRankingByUuid(RankingDto.GetMyRanking req){
        //내 랭킹

        String userUuid = userUtil.getLoginUserUuid();

        Optional<Object> myRankingObject = rankingRepository.getUserRankings(userUuid, req.getThemaCategory());
        String myNickname = "";
        String profileUrl = "";
        Time myBestTime = null;
        int myCategory = -1;
        int myRank = 0; // 내 랭킹 초기화
        // 내 랭킹 정보가 있는 경우에만 값을 설정
        if (myRankingObject.isPresent()) {
            Object[] myRankingArr = (Object[]) myRankingObject.get();
            myNickname = (String) myRankingArr[0];
            profileUrl = (String) myRankingArr[1];
            myBestTime = (Time) myRankingArr[2];
            myCategory = (int) myRankingArr[3];
        }
        else {
            // 내 랭킹 정보가 없는 경우
            log.info("no Rank");
            RankingDto.UserRankingDto dto = RankingDto.UserRankingDto.builder()
                    .rank(-1)
                    .nickname("")
                    .profileUrl("")
                    .bestTime(Time.valueOf("00:00:00"))
                    .thema(ThemaDto.ThemaType.getNameByOrder(myCategory))
                    .build();
            return dto;
        }
        //전체 랭킹
        List<Object> rankingObjects = rankingRepository.findAllByCategoryOrderByBestTimeAsc(req.getThemaCategory());

        int rank = 1;
        int rankCount = 0;
        Time prevTime = Time.valueOf("00:00:00");

        for (Object obj : rankingObjects) {
            Object[] arr = (Object[]) obj;
            String nickname = (String) arr[0];
            Time bestTime = (Time) arr[1];

            //동순위 처리
            if(prevTime.equals(bestTime)) {
                rank--;
                rankCount++;
            }
            else{
                prevTime = bestTime;
                if(rankCount != 0){
                    rank += rankCount;
                    rankCount = 0;
                }
            }

            if(myNickname.equals(nickname)){
                myRank = rank;
            }
            else{
                rank++;
            }
        }
        //내 랭킹 + 최고기록 정보
        return RankingDto.UserRankingDto.builder()
                 .rank(myRank)
                .profileUrl(profileUrl)
                 .nickname(myNickname)
                 .bestTime(myBestTime)
                 .thema(ThemaDto.ThemaType.getNameByOrder(myCategory))
                 .build();
    }
}
