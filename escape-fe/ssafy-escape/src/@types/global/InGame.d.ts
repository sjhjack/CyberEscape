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
  timePenalty: () => void
  setPenalty: (penalty: number) => void
  setSubtitle: (subtitle: string) => void
  setShowSpider?: (showSpider: boolean) => void
}

interface QuizDataProps {
  quizUuid: string
  content: string
  url: string
  difficulty: number
}

interface ClickObjectProps {
  onClick: () => void
  isFind?: boolean
  solved?: number
  setInteractNum: (interactNum: number) => void
}

interface StartProps {
  setSubtitle: (subtitle: string) => void
}

interface PlaySoundProps {
  penalty: number
  role: "experiment" | "scientist"
}

interface SolvedObjectProps {
  solved: number
}