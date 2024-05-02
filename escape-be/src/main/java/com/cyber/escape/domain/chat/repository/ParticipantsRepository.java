package com.cyber.escape.domain.chat.repository;

import com.cyber.escape.domain.chat.entity.Participants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface ParticipantsRepository extends JpaRepository<Participants, Long> {

    public Optional<Participants> findByUuid(String uuid);

}
