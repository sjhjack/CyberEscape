"use client"
import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import getRoomList from "@/services/game/room/getRoomList"
import Container from "@/components/common/Container"
import RoomList from "./RoomList"
import CustomPagination from "./CustomPagination"
import CircularProgress from "@mui/material/CircularProgress"
interface RequestData {
  page: number
  // keyword: string
}
const Room = () => {
  const [page, setPage] = useState<number>(1)
  const [keyword, setKeyword] = useState<string | null>(null)
  // const searchData: RequestData = { page: page, keyword: "" }
  const searchData: RequestData = { page: page }

  const {
    data: roomData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["roomList", searchData],
    queryFn: () => getRoomList(searchData),
    enabled: false, // 쿼리 비활성화
  })
  useEffect(() => {
    // 페이지 변경 시 쿼리 활성화 및 다시 실행
    refetch()
  }, [page, refetch])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }
  const defaultPagination = {
    totalRecordCount: 0,
    totalPageCount: 0,
    startPage: 1,
    endPage: 1,
    limitStart: 0,
    existPrevPage: false,
    existNextPage: false,
  }

  const paginationData = roomData?.data.pagination || defaultPagination

  if (isLoading) {
    return (
      <Container
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        backgroundColor="none"
      >
        <CircularProgress />
      </Container>
    )
  }
  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      backgroundColor="none"
    >
      {roomData?.data.roomList.map((room) => (
        <RoomList key={room.uuid} roomData={room} />
      ))}
      <CustomPagination
        pagination={paginationData}
        onPageChange={handlePageChange}
        currentPage={page}
      />
    </Container>
  )
}

export default Room
