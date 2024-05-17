import { useGLTF } from "@react-three/drei"
import { motion } from "framer-motion-3d"
import { useEffect, useState } from "react"

interface Props {
  showSpider: boolean
}

const Spider = ({ showSpider }: Props) => {
  const spider = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror2/spider.glb",
    true,
  )

  const [position, setPosition] = useState<[number, number, number]>([
    46, 90, 46,
  ])

  useEffect(() => {
    if (showSpider) {
      setPosition([46, 30, 46])
    }
  }, [showSpider])

  return (
    <motion.group
      animate={{
        x: position[0],
        y: position[1],
        z: position[2],
      }}
      transition={{
        duration: 0.7,
        ease: "easeIn",
      }}
    >
      <primitive object={spider.scene} scale={0.4} />
    </motion.group>
  )
}

export default Spider
