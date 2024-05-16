package com.cyber.escape.domain.room.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

public class PagingDto {

	@Builder
	@Getter
	public static class Response {
		private List<PageResponse> roomList = new ArrayList<>();
		private Pagination pagination;

		private Response(List<PageResponse> roomList, Pagination pagination){
			if(roomList.size() > 0) {
				this.roomList.addAll(roomList);
			}
			this.pagination = pagination;
		}

		public static Response of(List<PageResponse> roomList, Pagination pagination){
			return new Response(roomList, pagination);
		}
	}

	@Setter
	@Getter
	@Slf4j
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

		public PageRequest(int page, String keyword) {
			this.page = page;
			// this.keyword = keyword;
			setKeyword(keyword);
		}

		private void setKeyword(String keyword) {
			log.info("input keyword : {}", keyword);
			if(keyword.isEmpty()) {
				log.info("keyword is null !!");
				this.keyword = "%%";
			} else {
				this.keyword = "%" + keyword + "%";
			}
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
		private final int category;
		private final Long userId;
		private final String uuid;
		private final String nickname;
		private final boolean hasPassword;

		@QueryProjection
		public PageResponse(
			final String title,
			final int capacity,
			final LocalDateTime startedAt,
			final int category,
			final Long userId,
			final String uuid,
			final String nickname,
			final boolean hasPassword
		) {
			this.title = title;
			this.capacity = capacity;
			this.startedAt = startedAt;
			this.category = category;
			this.userId = userId;
			this.uuid = uuid;
			this.nickname = nickname;
			this.hasPassword = hasPassword;
		}
	}
}
