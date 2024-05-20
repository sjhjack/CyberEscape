import { useFrame } from "@react-three/fiber"
import { useRef, useState, useEffect } from "react"

const RotateBall = ({
  sunPosition,
  sequences,
  color,
  delay,
  isRotating,
}: any) => {
  const ballRef = useRef<any>()
  const [startTime, setStartTime] = useState<number | null>(null)

  useEffect(() => {
    if (isRotating) {
      if (delay && sequences[3].done === false) {
        const timer = setTimeout(() => {
          setStartTime(Date.now())
        }, delay)
        return () => clearTimeout(timer)
      } else {
        setStartTime(Date.now())
      }
    } else {
      setStartTime(null) // Stop rotation by resetting start time
    }
  }, [delay, isRotating])

  useFrame(({ clock }) => {
    if (!isRotating || !startTime) return
    const elapsed = clock.getElapsedTime() - startTime / 1000
    const radius = 2.9
    const speed = 2
    if (ballRef.current) {
      ballRef.current.position.x =
        sunPosition[0] + Math.cos(elapsed * speed) * radius
      ballRef.current.position.z =
        sunPosition[2] + Math.sin(elapsed * speed) * radius
      ballRef.current.rotation.y += 0.05
    }
  })

  return (
    <mesh ref={ballRef} position={sunPosition}>
      <sphereGeometry attach="geometry" args={[1, 32, 32]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  )
}

export default RotateBall
