package com.cyber.escape.domain.rank.repository;

import com.cyber.escape.domain.rank.entity.GameHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameHistoryRepository extends JpaRepository<GameHistory, String> {

}
