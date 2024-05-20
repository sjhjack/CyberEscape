"use client"
import styled from "styled-components"
import HelpIcon from "@mui/icons-material/Help"
import Image from "next/image"

const Page = () => {
  return (
    <div>
      <TitleBox>
        <HelpIcon sx={{ fontSize: "55px" }} />
        <div>게임 설명</div>
      </TitleBox>
      <MainContainer>
        <ImgBox>
          <Image
            src={process.env.NEXT_PUBLIC_IMAGE_URL + "/image/help/single_1.PNG"}
            alt=""
            width={700}
            height={450}
          />
        </ImgBox>
        <Text>
          게임이 시작하면 각각 테마별로 정해진 타이머가 작동합니다. 게임의
          진행도에 따라서 대사가 나오며 이를 참고하여 게임을 진행해주시면
          됩니다.
        </Text>
        <Text style={{ color: "red", fontWeight: "bold" }}>
          ※모달 형태의 문제를 풀거나 채팅 및 나가기 버튼을 누를 땐 "ESC" 혹은
          "ALT" 키를 눌러 마우스 커서를 표시 후 조작합니다.
        </Text>
        <SmallBox>
          <ImgBox>
            <Image
              src={
                process.env.NEXT_PUBLIC_IMAGE_URL + "/image/help/single_2.PNG"
              }
              alt=""
              width={400}
              height={250}
            />
          </ImgBox>
          <ImgBox>
            <Image
              src={
                process.env.NEXT_PUBLIC_IMAGE_URL + "/image/help/single_22.PNG"
              }
              alt=""
              width={400}
              height={250}
            />
          </ImgBox>
        </SmallBox>
        <Text>
          진행도에 따라, 혹은 기본적으로 클릭이 가능한 물체에는 마우스 커서
          모양이 바뀝니다.
        </Text>
        <SmallBox>
          <ImgBox>
            <Image
              src={
                process.env.NEXT_PUBLIC_IMAGE_URL + "/image/help/single_3.PNG"
              }
              alt=""
              width={400}
              height={250}
            />
          </ImgBox>
          <ImgBox>
            <Image
              src={
                process.env.NEXT_PUBLIC_IMAGE_URL + "/image/help/space_1.PNG"
              }
              alt=""
              width={400}
              height={250}
            />
          </ImgBox>
        </SmallBox>
        <Text>
          문제는 테마별로 형태가 다릅니다. 게임 당 1회만 사용 가능한 힌트는
          공포테마에서만 제공됩니다.
        </Text>
        <Text>힌트 사용 및 오답 선택 시 제한 시간의 30초가 차감됩니다.</Text>
        <SmallBox>
          <ImgBox>
            <Image
              src={
                process.env.NEXT_PUBLIC_IMAGE_URL + "/image/help/single_5.PNG"
              }
              alt=""
              width={400}
              height={250}
            />
          </ImgBox>
          <ImgBox>
            <Image
              src={
                process.env.NEXT_PUBLIC_IMAGE_URL + "/image/help/single_6.PNG"
              }
              alt=""
              width={400}
              height={250}
            />
          </ImgBox>
        </SmallBox>
        <Text>
          싱글 모드에서 탈출 성공 시, 탈출 시간과 내 최고 기록을 확인할 수
          있습니다.
        </Text>
        <Text style={{ paddingBottom: "20px" }}>
          만약 제한시간이 모두 경과했을 경우, 혹은 멀티 모드에서 상대가 먼저
          탈출했을 경우엔 탈출 실패 문구가 뜹니다.
        </Text>
        <ImgBox>
          <Image
            src={process.env.NEXT_PUBLIC_IMAGE_URL + "/image/help/multi_1.PNG"}
            alt=""
            width={700}
            height={450}
          />
        </ImgBox>
        <Text>멀티 모드는 1:1로, 상대와의 대결 방식으로 진행됩니다.</Text>
        <Text>
          따라서 본인 및 상대의 진행도 현황을 실시간으로 확인 가능하며 일반채팅
          및 음성채팅을 지원합니다.
        </Text>
        <Text>친구와 함께 누가 더 빨리 탈출하는지 겨뤄보세요!</Text>
      </MainContainer>
    </div>
  )
}

export default Page

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 70vw;
  height: 60vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const TitleBox = styled.div`
  font-size: 38px;
  font-weight: bold;
  padding: 10px;
  display: flex;
  justify-content: center;
`

const ImgBox = styled.div`
  padding: 20px;
`

const SmallBox = styled.div`
  display: flex;
  padding: 20px;
`
const Text = styled.div`
  font-size: 16px;
`
