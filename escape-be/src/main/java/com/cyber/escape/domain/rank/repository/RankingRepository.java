package com.cyber.escape.domain.rank.repository;

import com.cyber.escape.domain.rank.dto.RankingDto;
import com.cyber.escape.domain.rank.entity.Ranking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RankingRepository extends JpaRepository<Ranking, String> {
    Optional<Ranking> findByUserUuidAndThemaUuid(String userUuid, String themaUuid);

//    @Query("SELECT r FROM Ranking r JOIN Thema t ON r.thema.id = t.id WHERE t.uuid = :themaUuid ORDER BY r.bestTime ASC")
    @Query(value = "SELECT u.nickname, r.best_time, t.category " +
            "FROM ranking r " +
            "JOIN user u ON r.user_id = u.id " +
            "JOIN thema t ON r.thema_id = t.id " +
            "WHERE t.uuid = :themaUuid " +
            "ORDER BY r.best_time ASC", nativeQuery = true)
    List<Object> findAllByThemaUuidOrderByBestTimeAsc(@Param("themaUuid") String themaUuid);

//    @Query("SELECT u.nickname, r.best_time, t.category " +
//            "FROM ranking r " +
//            "JOIN user u ON r.user_id = u.id " +
//            "JOIN thema t ON r.themaId = t.id " +
//            "WHERE u.uuid = :userUuid AND t.uuid = :themaUuid " +
//            "ORDER BY r.best_time ASC")
//    List<Object[]> getUserRankings(@Param("userUuid") String userUuid, @Param("themaUuid") String themaUuid);

}
