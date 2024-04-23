package com.cyber.escape.domain.room.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cyber.escape.domain.room.entity.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
	List<Room> findAllRooms();
}
