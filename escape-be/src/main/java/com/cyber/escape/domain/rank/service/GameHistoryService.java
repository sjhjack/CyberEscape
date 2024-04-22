package com.cyber.escape.domain.rank.service;

import com.cyber.escape.domain.rank.dto.GameHistoryDto;
import com.cyber.escape.domain.rank.entity.GameHistory;
import com.cyber.escape.domain.rank.repository.GameHistoryRepository;
import com.cyber.escape.global.exception.UserException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameHistoryService {
    private final GameHistoryRepository gameHistoryRepository;

    @Transactional
    public void upload(GameHistoryDto gameHistoryDto){ // 게임 결과 모든 데이터 저장
        try{
            GameHistory gameHistory = GameHistory.builder()
                    //userId, themaId 추가 해야됨.
                    .uuid(gameHistoryDto.getUuid())
                    .clearTime(gameHistoryDto.getClearTime())
                    .build();

            gameHistoryRepository.save(gameHistory);
        }catch (UserException userException){
            log.error("Failed to upload profile image to S3", userException);
            throw userException;
        }
    }
}
