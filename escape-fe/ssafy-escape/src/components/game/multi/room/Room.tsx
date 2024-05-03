"use client"
import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import getRoomList from "@/services/game/room/getRoomList"
import Container from "@/components/common/Container"
import RoomList from "./RoomList"
import CustomPagination from "./CustomPagination"
const Room = () => {
  const [page, setPage] = useState<number>(1)
  const { data: roomData, isLoading } = useQuery({
    queryKey: ["roomList", page],
    queryFn: () => getRoomList(),
  })

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  if (isLoading) {
    return (
      <Container
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        로딩중입니다
      </Container>
    )
  }
  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {roomData?.data.roomList.map((room) => (
        <RoomList key={room.uuid} roomData={room} />
      ))}
      <CustomPagination
        pagination={
          roomData
            ? roomData.data.pagination
            : {
                totalRecordCount: 5,
                totalPageCount: 2,
                startPage: 1,
                endPage: 2,
                limitStart: 0,
                existPrevPage: false,
                existNextPage: false,
              }
        }
        onPageChange={handlePageChange}
      />
    </Container>
  )
}

export default Room
