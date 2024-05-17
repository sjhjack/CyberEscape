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
  currentPage: number
}

const CustomPagination = ({
  pagination,
  onPageChange,
  currentPage,
}: PaginationProps) => {
  return (
    <Pagination
      count={pagination.totalPageCount}
      page={currentPage}
      color="primary"
      onChange={(e, page) => onPageChange(page)}
      showFirstButton
      showLastButton
    />
  )
}

export default CustomPagination
