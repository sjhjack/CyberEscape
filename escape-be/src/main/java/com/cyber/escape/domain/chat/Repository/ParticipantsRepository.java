package com.cyber.escape.domain.chat.Repository;

import com.cyber.escape.domain.chat.entity.Participants;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ParticipantsRepository extends JpaRepository<Participants, Long> {

    public Optional<Participants> findByUuid(String uuid);
}
