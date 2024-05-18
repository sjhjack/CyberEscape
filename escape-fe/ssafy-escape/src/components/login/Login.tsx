"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { styled } from "styled-components"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import postSignUp from "@/services/user/postSignUp"
import useUserStore from "@/stores/UserStore"
import Button from "@/components/common/Button"
import Input from "@/components/common/Input"
import Container from "@/components/common/Container"
import { MainColor } from "@/styles/palette"
import Swal from "sweetalert2"
/*
추후 리팩토링 사항
1. disabled 버튼 스타일 적용 고려 2. return 이후 중복 코드 수정 고려
*/

interface LoginProps {
  handleLoginback: () => void // 로그인 페이지에서 뒤로가기를 눌렀을 경우
}

const Login = ({ handleLoginback }: LoginProps) => {
  const router = useRouter()
  const { login } = useUserStore()
  const [loginId, setLoginId] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  // 회원가입 창인지 확인
  const [isSignUpClicked, setIsSignUpClicked] = useState<boolean>(false)

  // 로그인 버튼 클릭 시
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const idRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/
    // 아이디 유효성 검사
    if (!idRegex.test(loginId)) {
      Swal.fire("아이디는 3~20자 사이 대소문자 또는 숫자만 입력해 주세요!")
      return
    }

    // 아이디 유효성 검사 통과 시
    try {
      await login(loginId, password)
      Swal.fire({
        title: "로그인 성공!",
        width: "500px",
        padding: "40px",
      })
      router.push("/main")
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }

  // 회원가입 버튼 클릭 시
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const idRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/
    // 아이디 유효성 검사
    if (!idRegex.test(loginId)) {
      Swal.fire({
        title: "아이디는 3~20자 사이 대소문자 또는 숫자만 입력해 주세요!",
        width: "500px",
        padding: "40px",
      })
      return
    }
    try {
      await postSignUp(loginId, password)
      Swal.fire({
        title: "회원가입 성공!",
        width: "500px",
        padding: "40px",
      })
      handleLoginback()
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }

  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      isBackButton={false}
    >
      {!isSignUpClicked ? (
        <div>
          <BackIcon onClick={() => handleLoginback()}>
            <ArrowBackIosNewIcon />
          </BackIcon>
          <Form onSubmit={(e) => handleLogin(e)}>
            <MainText>LOGIN</MainText>
            <Input
              placeholder="아이디"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              required
            />
            <Input
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              maxLength={20}
              required
            />
            <Button text="로그인" theme="success" type="submit" />
          </Form>
          <hr />
          <SubContainer>
            <SubText>계정이 없으신가요?</SubText>
            <Button
              text="회원가입"
              theme="success"
              onClick={() => {
                setIsSignUpClicked(true), setLoginId(""), setPassword("")
              }}
            />
          </SubContainer>
        </div>
      ) : (
        <div>
          <BackIcon
            onClick={() => {
              setIsSignUpClicked(false), setLoginId(""), setPassword("")
            }}
          >
            <ArrowBackIosNewIcon />
          </BackIcon>
          <Form onSubmit={(e) => handleSignUp(e)}>
            <MainText>SIGN UP</MainText>
            <Input
              placeholder="아이디"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              required
            />
            <Input
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              maxLength={20}
              required
            />
            <Button text="회원가입" theme="success" type="submit" />
          </Form>
        </div>
      )}
    </Container>
  )
}

export default Login

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 50px;
`

const MainText = styled.div`
  font-size: 35px;
  color: ${MainColor};
`

const SubText = styled.div`
  font-size: 12px;
  color: ${MainColor};
`

const BackIcon = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`
