import { useGLTF } from "@react-three/drei"

const FinalDoor = ({ onClick, setInteractNum, solved }: ClickObjectProps) => {
  const finalDoor = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror2/final_door.glb",
    true,
  )
  const handlePointerOver = () => {
    if (solved === 3) {
      setInteractNum(3)
    }
  }
  return (
    <primitive
      object={finalDoor.scene}
      scale={35}
      onPointerOver={handlePointerOver}
      onPointerOut={() => setInteractNum(1)}
      onClick={() => onClick()}
    />
  )
}

export default FinalDoor
