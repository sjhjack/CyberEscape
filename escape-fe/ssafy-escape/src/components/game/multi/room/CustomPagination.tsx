"use client"
import React, { useState, useEffect } from "react"
import Pagination from "@mui/material/Pagination"

interface pageInfos {
  totalRecordCount: number
  totalPageCount: number
  startPage: number
  endPage: number
  limitStart: number
  existPrevPage: boolean
  existNextPage: boolean
}
interface PaginationProps {
  pagination: pageInfos
  onPageChange: (page: number) => void
}

const CustomPagination = ({ pagination, onPageChange }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const currentPageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    onPageChange(currentPage)
  }, [currentPage])
  return (
    <Pagination
      count={pagination.totalPageCount}
      color="primary"
      onChange={currentPageChange}
      showFirstButton
      showLastButton
    />
  )
}

export default CustomPagination
