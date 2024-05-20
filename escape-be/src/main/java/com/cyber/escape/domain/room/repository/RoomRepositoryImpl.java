package com.cyber.escape.domain.room.repository;

import org.springframework.stereotype.Repository;

import com.cyber.escape.domain.room.dto.RoomDto;
import com.cyber.escape.domain.room.entity.Room;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
@RequiredArgsConstructor
public class RoomRepositoryImpl {
	private final JPAQueryFactory jpaQueryFactory;
	private final EntityManagerFactory entityManagerFactory;
	private final UserRepository userRepository;

	// public List<Room> findAllRoom(){
	// 	jpaQueryFactory.select(
	// 		new QRoomDto_Response()
	// 	)
	// }

	// 이렇게 사용하는건 레거시이다.
	public void changeRoomSetting(RoomDto.InfoRequest infoRequest) {
		EntityManager entityManager = entityManagerFactory.createEntityManager();

		Room room = entityManager.find(Room.class, infoRequest.getRoomUuid());

		room.setTitle(infoRequest.getTitle());
		// Todo : password 암호화
		room.setPassword(infoRequest.getPassword());

		entityManager.flush();
		entityManager.clear();
		entityManager.close();
	}

	public void changeHost(RoomDto.Request request) {
		EntityManager entityManager = entityManagerFactory.createEntityManager();
		Room room = entityManager.find(Room.class, request.getRoomUuid());
		// User host = userRepository.findUserByUuid(request.getUserUuid())
		// 	.orElseThrow(() -> new RuntimeException("일치하는 사용자가 없습니다."));

		User host = entityManager.getReference(User.class, request.getUserUuid());

		room.setHost(host);
	}
}
