package com.cyber.escape.domain.rank.repository;

import com.cyber.escape.domain.rank.dto.RankingDto;
import com.cyber.escape.domain.rank.entity.Ranking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RankingRepository extends JpaRepository<Ranking, String> {

    @Query("SELECT r FROM Ranking r JOIN Thema t ON r.thema.id = t.id WHERE t.category = :themaCategory AND r.user.uuid = :userUuid ORDER BY r.bestTime ASC")
    Optional<Ranking> findByUserUuidAndThemaCategory(String userUuid, int themaCategory);
//    @Query("SELECT r FROM Ranking r JOIN Thema t ON r.thema.id = t.id WHERE t.uuid = :themaUuid ORDER BY r.bestTime ASC")

    @Query(value = "SELECT u.nickname, r.best_time, t.category, u.profile_url " +
            "FROM ranking r " +
            "JOIN user u ON r.user_id = u.id " +
            "JOIN thema t ON r.thema_id = t.id " +
            "WHERE t.category = :themaCategory " +
            "ORDER BY r.best_time ASC", nativeQuery = true)
    List<Object> findAllByCategoryOrderByBestTimeAsc(@Param("themaCategory") int themaCategory);

    @Query(value = "SELECT u.nickname, u.profile_url, r.best_time, t.category " +
            "FROM ranking r " +
            "JOIN user u ON r.user_id = u.id " +
            "JOIN thema t ON r.thema_id = t.id " +
            "WHERE u.uuid = :userUuid AND t.category = :themaCategory ", nativeQuery = true)
    Optional<Object> getUserRankings(@Param("userUuid") String userUuid, @Param("themaCategory") int themaCategory);

}
