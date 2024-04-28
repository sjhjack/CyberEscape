package com.cyber.escape.domain.chat.repository;

import com.cyber.escape.domain.chat.entity.Participants;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ParticipantsRepository extends JpaRepository<Participants, Long> {

    public Optional<Participants> findByUuid(String uuid);
//    @Query("SELECT u FROM participants u WHERE u.uuid IN :uuids")
//    Optional<List<User>> findByUuids(@Param("uuids") List<String> uuids);

}
