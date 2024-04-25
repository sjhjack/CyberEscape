package com.cyber.escape.domain.room.repository.query;

import static com.cyber.escape.domain.room.entity.QRoom.*;
import static com.cyber.escape.domain.user.entity.QUser.*;

import java.util.List;

import com.cyber.escape.domain.room.dto.PagingDto;
import com.cyber.escape.domain.room.dto.QPagingDto_PageResponse;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class RoomRepositoryCustomImpl implements RoomRepositoryCustom {
	private final JPAQueryFactory queryFactory;

	public List<PagingDto.PageResponse> findAllRooms(PagingDto.PageRequest pageRequest){
		return queryFactory
			.select(new QPagingDto_PageResponse(
				room.title,
				room.capacity,
				room.startedAt,
				room.thema.id,
				room.host.id,
				room.uuid,
				user.nickname,
				Expressions.booleanPath("CASE WHEN EXISTS (SELECT 1 FROM Room r WHERE r.id = room.id AND r.password IS NOT NULL) THEN true ELSE false END")
			))
			.from(room)
			.innerJoin(user)
			.on(room.host.id.eq(user.id))
			.orderBy(room.id.asc())
			.offset(pageRequest.getOffset())
			.limit(4)
			.fetch();
	}
}

