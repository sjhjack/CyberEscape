import { useSphere } from "@react-three/cannon"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { usePlayerControls } from "./Helpers"
import * as THREE from "three"

const Player = (props: any) => {
  const direction = new THREE.Vector3()
  const frontVector = new THREE.Vector3()
  const sideVector = new THREE.Vector3()
  const speed = new THREE.Vector3()

  const [gravity, setGravity] = useState(true)

  const [SPEED, setSPEED] = useState(props.speed || 15)
  const { camera } = useThree()
  const [shouldMove, setShouldMove] = useState(false)
  const [isImmobile, setIsImmobile] = useState(false)
  const [shakeTimer, setShakeTimer] = useState(0)
  const [currentPosition, setCurrentPosition] = useState(new THREE.Vector3())

  const [ref, api] = useSphere((index) => ({
    mass: 6,
    type: "Dynamic",
    restitution: 0,
    ...props,
  }))

  // const [rotationChange, setRotationChange] = useState({ x: 0, y: 0 })
  // useEffect(() => {
  //   const onMouseMove = (event: MouseEvent) => {
  //     if (!gravity) return
  //     const { movementX, movementY } = event

  //     setRotationChange((prev) => ({
  //       x: prev.x - movementY * 0.00009,
  //       y: prev.y - movementX * 0.00009,
  //     }))
  //   }

  //   document.addEventListener("mousemove", onMouseMove)
  //   return () => {
  //     document.removeEventListener("mousemove", onMouseMove)
  //   }
  // }, [])

  useEffect(() => {
    if (!props.trigger) return
    if (
      (props.trigger[0].activate === true &&
        props.trigger[2].activate === true) ||
      (props.trigger[0].activate === true &&
        props.trigger[2].activate === false)
    ) {
      setShouldMove(true)
    }
    if (
      props.trigger[1].activate === true &&
      props.trigger[2].activate === false
    ) {
      const audio = new Audio(
        process.env.NEXT_PUBLIC_IMAGE_URL + "/sound/crash.mp3",
      )
      audio.play()
      setGravity(false)
      setSPEED(10)
    }
  }, [props.trigger])

  const { forward, backward, left, right } = usePlayerControls()
  const velocity = useRef([0, 0, 0])
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v))
    api.position.subscribe((p) => setCurrentPosition(new THREE.Vector3(...p)))
  }, [])
  const targetPosition1 = new THREE.Vector3(-102.4, 1, -71.79)

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.getWorldPosition(camera.position)
      camera.position.y = props.position[1] + 3.5
    }

    if (shouldMove && !isImmobile) {
      // Get current position
      if (ref.current) {
        const directionToTarget = new THREE.Vector3()
          .subVectors(targetPosition1, currentPosition)
          .normalize()
        const stepSize = 0.03 // Adjust step size for speed
        const step = directionToTarget.multiplyScalar(stepSize)
        const newPosition = currentPosition.add(step)

        api.position.set(newPosition.x, newPosition.y, newPosition.z)
        setTimeout(() => {
          setShakeTimer(4)
        }, 1000)
        setTimeout(() => {
          setShouldMove(false)
          setIsImmobile(true)
          // Set immobility timeout
          setTimeout(() => setIsImmobile(false), 8000) // 10 seconds
        }, 5000)
      }
    } else if (!isImmobile) {
      frontVector.set(0, 0, Number(backward) - Number(forward))
      sideVector.set(Number(left) - Number(right), 0, 0)
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(SPEED)
        .applyEuler(camera.rotation)
      speed.fromArray(velocity.current)
      api.velocity.set(direction.x, velocity.current[1], direction.z)
    } else if (isImmobile) {
      // Ensure the player remains immobile
      api.velocity.set(0, 0, 0)
    }

    if (camera && !gravity) {
      // if (ref.current) {
      //   const euler = new THREE.Euler().setFromQuaternion(
      //     ref.current.quaternion,
      //   )
      //   euler.y += rotationChange.y
      //   euler.x += rotationChange.x
      //   // euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x))
      //   camera.quaternion.setFromEuler(euler)
      // }

      const oscillationHeight = Math.sin(state.clock.elapsedTime * 3) * 0.5 // Adjust frequency and amplitude as needed
      camera.position.y += oscillationHeight
    }

    // Camera shake effect
    if (shakeTimer > 0 && props.sequences[1].done === false) {
      const intensity = Math.sin(shakeTimer * 100) * 0.05
      camera.position.y += intensity
      camera.position.x += intensity
      setShakeTimer(shakeTimer - delta)
    } else if (shakeTimer > 0 && props.sequences[1].done === true) {
      const intensity = Math.sin(shakeTimer * 10) * 0.05
      camera.position.y += intensity
      camera.position.x += intensity
      setShakeTimer(shakeTimer - delta)
    } else if (shakeTimer > 0) {
      const intensity = Math.sin(shakeTimer * 100) * 0.2
      camera.position.y += intensity
      camera.position.x += intensity
      setShakeTimer(shakeTimer - delta)
    }
  })

  return (
    <>
      <mesh
        castShadow
        position={props.position}
        ref={ref as React.MutableRefObject<THREE.Mesh>}
      >
        <sphereGeometry args={props.args || [2, 0.1, 0.1]} />
        <meshStandardMaterial color="#ff0000" opacity={0} transparent />
      </mesh>
    </>
  )
}

export default Player
