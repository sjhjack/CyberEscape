// 인게임 관련 인터페이스들

interface IngameMainProps {
  isGameStart: boolean
  setIsModelLoaded: (isModelLoaded: boolean) => void
  progressUpdate?: () => void
  progressReset?: () => void
  roomData?: PubResponseData | null
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

interface SSAFTYProblemProps {
  onClose: () => void
  timePenalty: () => void
  progressUpdate?: () => void
  setIsSolvedProblem: (isSolved: boolean) => void
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
  isSolvedProblem?: boolean
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

declare module "three/examples/jsm/utils/SkeletonUtils" {
  import { Object3D } from "three"
  export function clone(source: Object3D): Object3D
}
