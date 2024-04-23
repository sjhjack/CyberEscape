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
//            .uuid(gameHistoryDto.getUuid())
            .clearTime(gameHistoryDto.getClearTime())
            .build();
        gameHistoryRepository.save(gameHistory);
    }
}
