import { useGLTF } from "@react-three/drei"
import { useEffect, useState } from "react"
import { clone } from "three/examples/jsm/utils/SkeletonUtils"
import { Object3D } from "three"

const Notebook2 = ({
  onClick,
  isSolvedProblem,
  setInteractNum,
}: ClickObjectProps) => {
  const gltf = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/ssafy/notebook.glb",
    true,
  )
  const notebook2Position: [number, number, number][] = [
    [26.8, 30, 11.5],
    [37, 30, 11.5],
    [48, 30, 11.5],
    [59, 30, 11.5],
    [59, 30, -2],
    [48, 30, -2],
    [37, 30, -2],
    [26.8, 30, -2],
    [59, 30, -15.5],
    [48, 30, -15.5],
    [37, 30, -15.5],
    [26.8, 30, -15.5],
  ]

  const [index, setIndex] = useState(0)
  const [notebook2Scene, setNotebook2Scene] = useState<Object3D | null>(null)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * notebook2Position.length)
    setIndex(randomIndex)
  }, [])

  useEffect(() => {
    if (gltf.scene) {
      const clonedScene = clone(gltf.scene)
      clonedScene.position.set(
        notebook2Position[index][0],
        notebook2Position[index][1],
        notebook2Position[index][2],
      )
      clonedScene.rotation.set(0, -1.58, 0)
      setNotebook2Scene(clonedScene)
      console.log("Notebook2 position:", clonedScene.position)
    }
  }, [gltf, index])

  const handlePointerOver = () => {
    if (!isSolvedProblem) {
      setInteractNum(2)
    }
  }

  return (
    notebook2Scene && (
      <primitive
        object={notebook2Scene}
        scale={5}
        onPointerOver={handlePointerOver}
        onPointerOut={() => setInteractNum(1)}
        onClick={onClick}
      />
    )
  )
}

export default Notebook2
