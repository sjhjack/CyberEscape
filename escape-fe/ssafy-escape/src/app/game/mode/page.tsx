import Container from "../../../components/common/Container"
import "./style.css"

const GamePage = () => {
  return (
    <Container>
      <h1>모드 선택</h1>
      <main>
        <div>
          <img src="/image/single.png" />
          <p>싱글</p>
        </div>
        <div>
          <img src="/image/multi.png" />
          <p>멀티</p>
        </div>
      </main>
    </Container>
  )
}
export default GamePage
