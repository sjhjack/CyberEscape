package com.cyber.escape.domain.quiz.repository;

import com.cyber.escape.domain.quiz.entity.Quiz;
import com.cyber.escape.global.common.BaseRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    @Query(value = "SELECT * FROM ("
            + "(SELECT * FROM quiz WHERE difficulty = 1 AND thema_id = :themaId ORDER BY RAND() LIMIT 1)"
            + " UNION ALL "
            + "(SELECT * FROM quiz WHERE difficulty = 2 AND thema_id = :themaId ORDER BY RAND() LIMIT 1)"
            + " UNION ALL "
            + "(SELECT * FROM quiz WHERE difficulty = 3 AND thema_id = :themaId ORDER BY RAND() LIMIT 1)"
            + ") as sub", nativeQuery = true)
    public Optional<List<Quiz>> submissQuizzez(@Param("themaId") Long themaId);
}
