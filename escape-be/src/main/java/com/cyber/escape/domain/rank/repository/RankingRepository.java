package com.cyber.escape.domain.rank.repository;

import com.cyber.escape.domain.rank.entity.GameHistory;
import com.cyber.escape.domain.rank.entity.Ranking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RankingRepository extends JpaRepository<Ranking, Long> {
}
//v2 ranking에 nickname 추가