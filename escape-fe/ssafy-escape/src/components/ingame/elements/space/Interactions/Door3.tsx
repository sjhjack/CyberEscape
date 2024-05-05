import { useEffect, useRef, useState } from "react"
import { useGLTF } from "@react-three/drei"
import { AnimationMixer } from "three"

const Door3 = ({ position, rotation }: any) => {
  const { scene, animations } = useGLTF("/glb/door5.glb", true)
  const doorRef = useRef()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAnimationActivated, setIsAnimationActivated] = useState(false)

  useEffect(() => {
    if (!scene || !animations || animations.length === 0) return

    const mixer = new AnimationMixer(scene)
    const action = mixer.clipAction(animations[0])

    if (isAnimationActivated) {
      action.play()
    } else {
      action.stop()
    }

    const update = () => {
      mixer.update(0.01)
    }

    let animateId: number

    if (isAnimationActivated) {
      animateId = requestAnimationFrame(function animate() {
        update()
        animateId = requestAnimationFrame(animate)
      })
    }

    return () => {
      if (animateId) {
        cancelAnimationFrame(animateId)
      }
      mixer.stopAllAction()
    }
  }, [scene, animations, isAnimationActivated])

  useEffect(() => {
    if (scene) {
      setIsLoaded(true)
    }
  }, [scene])

  const handleClick = () => {
    setIsAnimationActivated(true)
    setTimeout(() => {
      setIsAnimationActivated(false)
    }, 10000)
  }

  return isLoaded ? (
    <primitive
      object={scene}
      ref={doorRef}
      scale={26}
      position={position}
      rotation={rotation}
      onClick={handleClick}
    />
  ) : null
}

export default Door3
