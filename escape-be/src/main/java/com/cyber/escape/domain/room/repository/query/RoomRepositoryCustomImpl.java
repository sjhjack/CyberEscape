package com.cyber.escape.domain.room.repository.query;

import static com.cyber.escape.domain.room.entity.QRoom.*;
import static com.cyber.escape.domain.user.entity.QUser.*;

import java.util.List;

import com.cyber.escape.domain.room.dto.PagingDto;
import com.cyber.escape.domain.room.dto.QPagingDto_PageResponse;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.JPAExpressions;
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
				room.thema.category,
				room.host.id,
				room.uuid,
				user.nickname,
				room.hasPassword
				// new CaseBuilder()
				// 	.when(JPAExpressions.selectFrom(room)
				// 		.where(room.id.eq(room.id).and(room.password.isNotNull()))
				// 		.exists())
				// 	.then(true)
				// 	.otherwise(false).as("hasPassword")
			))
			.from(room)
			.innerJoin(room.host, user)
			.where(room.title.like(pageRequest.getKeyword()))
			.orderBy(room.id.asc())
			.offset(pageRequest.getOffset())
			.limit(4)
			.fetch();
	}
}

