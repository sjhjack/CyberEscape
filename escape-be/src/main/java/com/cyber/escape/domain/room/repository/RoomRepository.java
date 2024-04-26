package com.cyber.escape.domain.room.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cyber.escape.domain.room.entity.Room;
import com.cyber.escape.domain.room.repository.query.RoomRepositoryCustom;

// JPA, QueryDSL 둘 다 사용
public interface RoomRepository extends JpaRepository<Room, Long>, RoomRepositoryCustom {
	void deleteRoomByUuid(String uuid);

	Optional<Room> findRoomByUuid(String uuid);

	long countAllByTitleLike(String keyword);
}