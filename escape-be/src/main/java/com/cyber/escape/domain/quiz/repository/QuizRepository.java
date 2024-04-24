package com.cyber.escape.domain.quiz.repository;

import com.cyber.escape.domain.quiz.entity.Quiz;
import com.cyber.escape.global.common.BaseRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    public Optional<List<Quiz>> findByThemaUuid(String themaUuid);
}
