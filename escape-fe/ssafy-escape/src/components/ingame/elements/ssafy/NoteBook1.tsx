import { useGLTF } from "@react-three/drei"
import { useEffect, useState } from "react"
import { clone } from "three/examples/jsm/utils/SkeletonUtils"
import { Object3D } from "three"

const Notebook1 = ({
  onClick,
  isSolvedProblem,
  setInteractNum,
}: ClickObjectProps) => {
  const gltf = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/ssafy/notebook.glb",
    true,
  )
  const notebook1Position: [number, number, number][] = [
    [26.8, 30, 24.75],
    [37, 30, 24.75],
    [48, 30, 24.75],
    [59, 30, 24.75],
    [59, 30, 38],
    [48, 30, 38],
    [37, 30, 38],
    [26.8, 30, 38],
    [21, 30, 54],
    [31, 30, 54],
    [40, 30, 54],
  ]

  const [index, setIndex] = useState(0)
  const [notebook1Scene, setNotebook1Scene] = useState<Object3D | null>(null)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * notebook1Position.length)
    setIndex(randomIndex)
  }, [])

  useEffect(() => {
    if (gltf.scene) {
      const clonedScene = clone(gltf.scene)
      clonedScene.position.set(
        notebook1Position[index][0],
        notebook1Position[index][1],
        notebook1Position[index][2],
      )
      clonedScene.rotation.set(0, -1.58, 0)
      setNotebook1Scene(clonedScene)
      console.log("Notebook1 position:", clonedScene.position)
    }
  }, [gltf, index])

  const handlePointerOver = () => {
    if (!isSolvedProblem) {
      setInteractNum(2)
    }
  }

  return (
    notebook1Scene && (
      <primitive
        object={notebook1Scene}
        scale={5}
        onPointerOver={handlePointerOver}
        onPointerOut={() => setInteractNum(1)}
        onClick={onClick}
      />
    )
  )
}

export default Notebook1
