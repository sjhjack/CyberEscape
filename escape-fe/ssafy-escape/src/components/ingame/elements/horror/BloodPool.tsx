import { useGLTF } from "@react-three/drei"
import { memo, useEffect, useMemo } from "react"

interface BloodPoolProps {
  solved: number
  isFlowerClicked: boolean
}

const BloodPool = memo(({ solved, isFlowerClicked }: BloodPoolProps) => {
  const { scene: bloodPool1 } = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror/pool_blood1.glb",
    true,
  )
  const { scene: bloodPool2 } = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror/pool_blood2.glb",
    true,
  )
  const { scene: bloodPool3 } = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror/pool_blood3.glb",
    true,
  )

  const bloodPools = useMemo(() => {
    const pools = []

    if (isFlowerClicked === true)
      pools.push(<primitive object={bloodPool2} scale={450} />)
    if (solved >= 1) pools.push(<primitive object={bloodPool1} scale={700} />)
    if (solved >= 2 && isFlowerClicked === false)
      pools.push(<primitive object={bloodPool2} scale={450} />)
    if (solved >= 3) pools.push(<primitive object={bloodPool3} scale={700} />)
    return pools
  }, [solved, isFlowerClicked, bloodPool1, bloodPool2, bloodPool3])

  useEffect(() => {
    if (bloodPool1) {
      bloodPool1.position.set(-35, 0, -22)
    }
    if (bloodPool2) {
      bloodPool2.position.set(-36, 20, 44)
    }
    if (bloodPool3) {
      bloodPool3.position.set(113, 0, -80)
    }
  }, [bloodPool1, bloodPool2, bloodPool3])

  // 콘솔 오류 해결 필요
  return <>{bloodPools}</>
})
export default BloodPool
