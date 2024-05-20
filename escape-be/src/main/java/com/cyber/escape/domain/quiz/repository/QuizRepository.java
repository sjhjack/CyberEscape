package com.cyber.escape.domain.quiz.repository;

import com.cyber.escape.domain.quiz.entity.Quiz;
import com.cyber.escape.global.common.BaseRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, Long> {


    @Query(value = "SELECT q.* FROM quiz q "
                    + "INNER JOIN thema t ON q.thema_id = t.id "
                    + "WHERE t.category = :category AND q.difficulty = :difficulty", nativeQuery = true)
    public Optional<List<Quiz>> getQuizzezByCategory(int category, int difficulty);

    public Optional<Quiz> findByUuid(String uuid);

}
