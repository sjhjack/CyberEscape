package com.cyber.escape.domain.thema.repository;

import com.cyber.escape.domain.thema.entity.Thema;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ThemaRepository extends JpaRepository<Thema, Long> {
    Optional<Thema> findByUuid(String uuid);
}
