"use client"
import React, { useEffect } from "react"
import Container from "@/components/common/Container"
import { CircularProgress } from "@mui/material"
const Random = () => {
  useEffect(() => {
    console.log("random")
  }, [])
  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <h1 style={{ marginBottom: "10%" }}>상대를 매칭 중입니다.</h1>
      <CircularProgress />
    </Container>
  )
}

export default Random
