import { useGLTF } from "@react-three/drei"

interface PortraitProps {
  twoMinLater: boolean
  fiveMinLater: boolean
}

// 추후 중복 제거 리팩토링
const Portrait = ({ twoMinLater, fiveMinLater }: PortraitProps) => {
  const portrait = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror/before_portrait.glb",
    true,
  )
  const horrorPortrait = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror/after_portrait.glb",
    true,
  )
  let horrorPortraitScale = 35
  if (fiveMinLater) {
    horrorPortrait.scene.rotation.set(3, 0, 0)
    horrorPortrait.scene.position.set(15, 105, -132)
    horrorPortraitScale = 45
  }
  return (
    <>
      {twoMinLater ? (
        <primitive object={horrorPortrait.scene} scale={horrorPortraitScale} />
      ) : (
        <primitive object={portrait.scene} scale={35} />
      )}
    </>
  )
}

export default Portrait
