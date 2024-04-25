import Container from "@/components/common/Container"
import * as S from "./waitingStyle"
import ChattingBox from "@/components/waitingroom/ChattingBox"
const Page = () => {
  return (
    <Container display="flex" justifyContent="center" alignItems="center">
      <S.UserBox style={{ marginRight: "20px" }}>
        <S.CharacterBox></S.CharacterBox>
        <S.Nickname>김싸피</S.Nickname>
      </S.UserBox>
      <S.MainBox>
        <S.MainContentBox>
          <S.ThemeImage
            src="/image/horror.jpg"
            alt=""
            width={350}
            height={200}
            priority
          />
        </S.MainContentBox>
        <ChattingBox></ChattingBox>
      </S.MainBox>
      <S.UserBox style={{ marginLeft: "20px" }}>
        <S.CharacterBox></S.CharacterBox>
        <S.Nickname>이싸피</S.Nickname>
      </S.UserBox>
    </Container>
  )
}

export default Page
