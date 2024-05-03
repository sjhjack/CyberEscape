// 인게임 관련 인터페이스들

interface IngameMainProps {
  isGameStart: boolean
  setIsModelLoaded: (isModelLoaded: boolean) => void
}

interface RoomProps {
  onLoaded: (isLoaded: boolean) => void
}