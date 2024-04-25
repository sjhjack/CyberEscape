package com.cyber.escape.domain.room.dto;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
public class Pagination {

	private int totalRecordCount;     // 전체 데이터 수
	private int totalPageCount;       // 전체 페이지 수
	private int startPage;            // 첫 페이지 번호
	private int endPage;              // 끝 페이지 번호
	private int limitStart;           // LIMIT 시작 위치
	private boolean existPrevPage;    // 이전 페이지 존재 여부
	private boolean existNextPage;    // 다음 페이지 존재 여부

	public Pagination(int totalRecordCount, PagingDto.PageRequest pageRequest) {
		if (totalRecordCount > 0) {
			this.totalRecordCount = totalRecordCount;
			calculation(pageRequest);
		}

		log.info("totalRecordCount = {} | totalPageCount = {} | startPage = {} | endPage = {} | limitStart = {} | ", totalRecordCount, totalPageCount, startPage, endPage, limitStart);
		log.info("existPrevPage = {} | existNextPage = {}", existPrevPage, existNextPage);
	}

	private void calculation(PagingDto.PageRequest pageRequest) {

		// 전체 페이지 수 계산
		totalPageCount = ((totalRecordCount - 1) / pageRequest.getRecordSize()) + 1;

		// 현재 페이지 번호가 전체 페이지 수보다 큰 경우, 현재 페이지 번호에 전체 페이지 수 저장
		if (pageRequest.getPage() > totalPageCount) {
			pageRequest.setPage(totalPageCount);
		}

		// 첫 페이지 번호 계산
		startPage = ((pageRequest.getPage() - 1) / pageRequest.getPageSize()) * pageRequest.getPageSize() + 1;

		// 끝 페이지 번호 계산
		endPage = startPage + pageRequest.getPageSize() - 1;

		// 끝 페이지가 전체 페이지 수보다 큰 경우, 끝 페이지 전체 페이지 수 저장
		if (endPage > totalPageCount) {
			endPage = totalPageCount;
		}

		// LIMIT 시작 위치 계산
		limitStart = (pageRequest.getPage() - 1) * pageRequest.getRecordSize();

		// 이전 페이지 존재 여부 확인
		existPrevPage = startPage != 1;

		// 다음 페이지 존재 여부 확인
		existNextPage = (endPage * pageRequest.getRecordSize()) < totalRecordCount;
	}

}