package com.cyber.escape.domain.quiz.repository;

import com.cyber.escape.domain.quiz.entity.FinalAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface FinalAnswerRepository extends JpaRepository<FinalAnswer, Long> {
    @Query(value = "SELECT * FROM final_answer ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Optional<FinalAnswer> findRandomAnswer();

    Optional<FinalAnswer> findByUuid(String uuid);
}
