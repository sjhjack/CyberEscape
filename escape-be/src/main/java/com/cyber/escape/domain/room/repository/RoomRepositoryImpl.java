package com.cyber.escape.domain.room.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.cyber.escape.domain.room.dto.QRoomDto_Response;
import com.cyber.escape.domain.room.entity.Room;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
@RequiredArgsConstructor
public class RoomRepositoryImpl {
	private final JPAQueryFactory jpaQueryFactory;
	private final EntityManager entityManager;

	// public List<Room> findAllRoom(){
	// 	jpaQueryFactory.select(
	// 		new QRoomDto_Response()
	// 	)
	// }
}
