import { useGLTF } from "@react-three/drei"

interface PaperProps {
  twoMinLater: boolean
}

const Paper = ({ twoMinLater }: PaperProps) => {
  const paper = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror2/paper.glb",
    true,
  )
  const horrorPaper = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror2/after_paper.glb",
    true,
  )
  return (
    <>
      {twoMinLater ? (
        <primitive object={horrorPaper.scene} scale={35} />
      ) : (
        <primitive object={paper.scene} scale={35} />
      )}
    </>
  )
}

export default Paper
