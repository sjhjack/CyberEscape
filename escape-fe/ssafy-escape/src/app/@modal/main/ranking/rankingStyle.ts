import { styled } from "styled-components"
import Image from "next/image"

interface ImageProps {
  $isActive: boolean
}

interface TopThreeProps {
  $isTopThree: boolean
}

export const TitleBox = styled.div`
  display: flex;
  font-size: 38px;
  font-weight: bold;
  padding: 10px;
  align-items: center;
  justify-content: center;
`

export const ThemeMainBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 10px;
  gap: 15px;
`

export const ThemeSubBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

export const CustomImage = styled(Image)<ImageProps>`
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.$isActive ? "scale(1.2)" : "scale(1)")};
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`

export const RankingMainBox = styled.div`
  width: 70vw;
  height: 48vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`

export const RankingSubBox = styled.div`
  /* background-color: #ebebeb; */
  border-radius: 20px;
  padding: 15px;
  width: 38vw;
  height: inherit;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const RankInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 23px;
  padding: 5px;
`

export const RankPosition = styled.div`
  min-width: 50px;
  text-align: center;
`
export const First = styled.div`
  color: #e9c154;
  font-weight: bold;
`

export const Second = styled.div`
  color: #686868;
  font-weight: bold;
`

export const Third = styled.div`
  color: #97662d;
  font-weight: bold;
`

export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-grow: 1;
`
export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 30%;
  object-fit: cover;
`

export const Nickname = styled.div<TopThreeProps>`
  flex: 1;
  font-size: 20px;
  font-weight: ${(props) => (props.$isTopThree ? "bold" : "normal")};
`

export const Time = styled.div<TopThreeProps>`
  display: flex;
  align-items: center;
  gap: 2px;
  min-width: 150px;
  text-align: right;
  color: #dd3232;
  font-weight: ${(props) => (props.$isTopThree ? "bold" : "normal")};
`

export const NoTimeText = styled.div`
  text-align: center;
`
