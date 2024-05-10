import { useGLTF } from "@react-three/drei"

const Flower = ({ onClick, setInteractNum }: ClickObjectProps) => {
  const flower = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror/flower.glb",
    true,
  )
  return (
    <primitive
      object={flower.scene}
      scale={35}
      onPointerOver={() => setInteractNum(2)}
      onPointerOut={() => setInteractNum(1)}
      onClick={onClick}
    />
  )
}

export default Flower
