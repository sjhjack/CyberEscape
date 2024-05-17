// 인게임 관련 인터페이스들

interface IngameMainProps {
  isGameStart: boolean
  setIsModelLoaded: (isModelLoaded: boolean) => void
  progressUpdate?: () => void
}

interface RoomProps {
  onLoaded: (isLoaded: boolean) => void
}

interface ProblemProps {
  onClose: () => void
  penalty?: number
  timePenalty: () => void
  setPenalty?: (penalty: number) => void
  setSubtitle?: (subtitle: string) => void
  setShowSpider?: (showSpider: boolean) => void
  progressUpdate?: () => void
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

interface chatData {
  userName: string
  message: string
}

interface OptionList {
  [key: string]: string[]
}

interface HorrorOptionData {
  horror1QuizList: OptionList
  horror2QuizList: OptionList
}
interface SsafyOptionData {
  ssafy1QuizList: OptionList
  ssafy2QuizList: OptionList
}
