package com.cyber.escape.domain.room.repository.query;

import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class RoomRepositoryCustomImpl implements RoomRepositoryCustom {
	private final JPAQueryFactory queryFactory;

}

