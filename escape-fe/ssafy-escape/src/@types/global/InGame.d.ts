// 인게임 관련 인터페이스들

interface IngameMainProps {
  isGameStart: boolean
  setIsModelLoaded: (isModelLoaded: boolean) => void
}

interface RoomProps {
  onLoaded: (isLoaded: boolean) => void
}

interface ProblemProps {
  onClose: () => void
  penalty: number
  timePenalty : () => void
  setPenalty: (penalty: number) => void
  setSubtitle: (subtitle: string) => void
}

interface ClickObjectProps {
  onClick: () => void
}

interface KnobProps {
  onClick: () => void
  isFind: boolean
  solved: number
}

interface QuizDataProps {
  quizUuid: string
  content: string
  url: string
  difficulty: number
}