package com.cyber.escape.domain.thema.repository;

import com.cyber.escape.domain.thema.entity.Thema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ThemaRepository extends JpaRepository<Thema, Long> {
    Optional<Thema> findByUuid(String uuid);
    Optional<Thema> findByCategory(int category);

    @Query(value = "SELECT * FROM thema " +
                    "WHERE category IN (1, 4, 7)", nativeQuery = true)
    List<Thema> findStandardThema();

}
