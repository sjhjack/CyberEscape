import React from "react"
import LinearProgress from "@mui/material/LinearProgress"
import styled from "styled-components"

const Container = styled.div`
  position: absolute;
  margin-left: 20px;
  width: 20%;
  height: 160px;
  bottom: 0;
  left: 0;
`

const IDBox = styled.div`
  color: white;
  font-size: 25px;
  text-shadow:
    1px 1px 0px black,
    -1px -1px 0px black,
    1px -1px 0px black,
    -1px 1px 0px black;
`

const ProgressBarBox = styled.div`
  margin-bottom: 15px;
`

const ProgressBar = ({ id1, id2, value1, value2 }: any) => {
  return (
    <Container>
      <IDBox>{id1}</IDBox>
      <ProgressBarBox>
        <LinearProgress
          variant="determinate"
          value={value1}
          sx={{
            height: 20,
            backgroundColor: "black",
            borderRadius: 10,
            "& .MuiLinearProgress-bar": {
              backgroundColor: "white",
            },
          }}
        />
      </ProgressBarBox>
      <IDBox>{id2}</IDBox>
      <ProgressBarBox>
        <LinearProgress
          variant="determinate"
          value={value2}
          sx={{
            height: 20,
            backgroundColor: "black",
            borderRadius: 10,
            "& .MuiLinearProgress-bar": {
              backgroundColor: "white",
            },
          }}
        />
      </ProgressBarBox>
    </Container>
  )
}

export default ProgressBar
