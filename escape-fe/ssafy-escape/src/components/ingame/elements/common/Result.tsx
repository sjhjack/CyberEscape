import Button from "@/components/common/Button"
import postMyRanking from "@/services/main/ranking/postMyRanking"
import { MainColor, RedColor } from "@/styles/palette"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import styled from "styled-components"

interface ResultProps {
  type: "forfeitedVictory" | "victory" | "defeat" | "timeOut" | string // 순서대로 몰수승, 승리, 패배, 시간초과
  themeIdx: number | null
  selectedThemeType: string | null
  clearTime?: string | null
}

interface ResultButtonStyleProps {
  $type: "victory" | "defeat"
}

const Result = ({
  type,
  themeIdx,
  selectedThemeType,
  clearTime,
}: ResultProps) => {
  const router = useRouter()
  const { data: myRankingData } = useQuery({
    queryKey: ["myRanking", themeIdx],
    queryFn: () =>
      themeIdx !== null
        ? postMyRanking(themeIdx)
        : Promise.reject(new Error("themeIdx is null")),
  })

  // 나가기 버튼 눌렀을 시
  const handleQuit = () => {
    if (selectedThemeType === "single") {
      window.location.href = "/main"
    } else {
      // 포인터락 버그 발생 할 수 있음. 확인 필요(필요할 시 새로고침 -> window.location.reload())
      router.back()
    }
  }

  if (!myRankingData) {
    return
  }

  return selectedThemeType === "single" ? (
    /* 싱글일 경우 */
    <MainContainer>
      {type === "victory" ? (
        <SubContainer>
          <MainText $type="victory">탈출 성공!</MainText>
          <SubText>탈출 시간: {clearTime}</SubText>
          {myRankingData?.bestTime != "00:00:00" ? (
            <SubText>내 최고 기록: {myRankingData?.bestTime}</SubText>
          ) : null}
          <ButtonBox>
            <Button
              width="80px"
              height="40px"
              text="재도전"
              theme="success"
              onClick={() => (window.location.href = "/main/theme")}
            />
            <Button
              width="80px"
              height="40px"
              text="나가기"
              theme="fail"
              onClick={() => handleQuit()}
            />
          </ButtonBox>
        </SubContainer>
      ) : (
        <SubContainer>
          <MainText $type="defeat">탈출 실패</MainText>
          <Button
            width="80px"
            height="40px"
            text="나가기"
            theme="fail"
            onClick={() => handleQuit()}
          />
        </SubContainer>
      )}
    </MainContainer>
  ) : (
    /* 멀티일 경우 */
    <MainContainer>
      {type === "defeat" || type === "timeOut" ? (
        <SubContainer>
          <MainText $type="defeat">탈출 실패</MainText>
          {type === "defeat" ? (
            <SubText>상대가 먼저 방을 탈출했습니다.</SubText>
          ) : (
            <SubText>제 시간 안에 탈출하지 못했습니다.</SubText>
          )}
          <SubText>5초 후 대기실로 이동합니다. </SubText>
        </SubContainer>
      ) : (
        <SubContainer>
          <MainText $type="victory">탈출 성공!</MainText>
          <SubText>상대보다 먼저 방을 탈출했습니다!</SubText>
          <SubText>5초 후 대기실로 이동합니다. </SubText>
        </SubContainer>
      )}
    </MainContainer>
  )
}

export default Result

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`

const SubContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`

const ButtonBox = styled.div`
  display: flex;
  gap: 15px;
`

const MainText = styled.div<ResultButtonStyleProps>`
  font-size: 70px;
  font-weight: bold;
  color: ${(props) => (props.$type === "victory" ? MainColor : RedColor)};
`

const SubText = styled.div`
  font-size: 25px;
  color: white;
`
