package com.cyber.escape.domain.rank.service;

import com.cyber.escape.domain.rank.dto.GameHistoryDto;
import com.cyber.escape.domain.rank.entity.GameHistory;
import com.cyber.escape.domain.rank.repository.GameHistoryRepository;
import com.cyber.escape.domain.thema.entity.Thema;
import com.cyber.escape.domain.thema.repository.ThemaRepository;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameHistoryService {
    private final GameHistoryRepository gameHistoryRepository;
    private final UserRepository userRepository;
    private final ThemaRepository themaRepository;

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

        //ranking 테이블에 내 정보가 있는지 (내 기록이 있는지)
        // 없다면 그냥 넣기

        // ranking 테이블에 내 정보는 있는데 최고 그 시간을 내가 넘었는지 아닌지
        //

    }
}
