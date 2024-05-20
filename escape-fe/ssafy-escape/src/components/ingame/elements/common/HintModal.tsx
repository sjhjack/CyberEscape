import MainModal from "@/components/common/MainModal"
import postHint from "@/services/ingame/postHint"
import { useQuery } from "@tanstack/react-query"

interface HintModalProps extends ModalProps {
  quizUuid: string
}
const HintModal = ({ open, onClose, quizUuid }: HintModalProps) => {
  const { data: hintData } = useQuery({
    queryKey: ["quizHint", quizUuid],
    queryFn: () =>
      quizUuid !== null
        ? postHint(quizUuid)
        : Promise.reject(new Error("quizUuid is null")),
  })
  if (!hintData) {
    return
  }

  return (
    <>
      <MainModal
        text="힌트"
        isOpen={open}
        onClose={onClose}
        width="200px"
        height="200px"
      >
        <div>{hintData.hint}</div>
      </MainModal>
    </>
  )
}

export default HintModal
