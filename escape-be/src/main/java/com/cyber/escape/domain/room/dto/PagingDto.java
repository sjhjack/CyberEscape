package com.cyber.escape.domain.room.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class PagingDto {

	@Builder
	@Getter
	public static class Response<T> {
		private List<T> roomList;
		private Pagination pagination;

		public Response(List<T> roomList, Pagination pagination){
			this.roomList.addAll(roomList);
			this.pagination = pagination;
		}
	}

	@Setter
	@Getter
	public static class PageRequest {
		private int page = 1;					// 현재 페이지
		private final int recordSize = 4;		// 페이지에 출력할 방 개수
		private final int pageSize = 5;			// 하단에 표시할 페이지 개수
		private String keyword;				// 검색어
		private Pagination pagination;

		public PageRequest(){
			// this.page = 1;
			// this.recordSize = 4;
			// this.pageSize = 5;
		}

		public int getOffset(){
			return this.pagination.getLimitStart();
		}
	}

	@Builder
	@Getter
	public static class PageResponse {
		private final String title;
		private final int capacity;
		private final LocalDateTime startedAt;
		private final Long themaId;
		private final Long userId;
		private final String uuid;
		private final String nickname;
		private final boolean hasPassword;

		@QueryProjection
		public PageResponse(
			final String title,
			final int capacity,
			final LocalDateTime startedAt,
			final Long themaId,
			final Long userId,
			final String uuid,
			final String nickname,
			final boolean hasPassword
		) {
			this.title = title;
			this.capacity = capacity;
			this.startedAt = startedAt;
			this.themaId = themaId;
			this.userId = userId;
			this.uuid = uuid;
			this.nickname = nickname;
			this.hasPassword = hasPassword;
		}
	}
}
