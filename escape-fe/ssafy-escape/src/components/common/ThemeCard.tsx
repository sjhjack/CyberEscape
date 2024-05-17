import styled from "styled-components"
import Image from "next/image"
import "./style.css"
interface CardComponentProps {
  themeData: CardInfo
  $width?: number
  $height?: number
  fontsize?: string
}
interface ImageStyleProps {
  $width?: number
  $height?: number
}
const ThemeCard = ({
  themeData,
  $width,
  $height,
  fontsize,
}: CardComponentProps) => {
  return (
    <Card>
      <ThemeImageContainer $width={$width} $height={$height}>
        <ThemeImage
          src={themeData.image}
          alt="테마 이미지"
          width={$width}
          height={$height}
          priority
        />
        <ImageText>
          <div>주제: {themeData.title}</div>
          <div>제한시간: {themeData.time}</div>
          <div style={{ wordBreak: "keep-all", fontSize: fontsize }}>
            내용: {themeData.content}
          </div>
        </ImageText>
      </ThemeImageContainer>
    </Card>
  )
}

export default ThemeCard

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ThemeImageContainer = styled.div<ImageStyleProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.$width ? `${props.$width}px` : "400px")};
  height: ${(props) => (props.$height ? `${props.$height}px` : "250px")};
`

const ThemeImage = styled(Image)`
  transition: transform 0.2s ease-in-out;
  border-radius: 20px;
  width: 100%; // 가로 길이를 부모에 맞춤
  height: 100%; // 세로 길이를 부모에 맞춤
  object-fit: cover; // 이미지 비율을 유지하면서 컨테이너에 맞게 조절

  ${ThemeImageContainer}:hover & {
    filter: brightness(0.3);
  }
`

const ImageText = styled.div`
  position: absolute;
  top: 50%; // 상단 기준 50% 위치
  left: 50%; // 왼쪽 기준 50% 위치
  transform: translate(-50%, -50%); // 정확한 중앙 정렬을 위해 변환 사용
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${ThemeImageContainer}:hover & {
    opacity: 1;
  }
`
