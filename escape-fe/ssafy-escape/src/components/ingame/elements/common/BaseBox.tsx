import { useBox } from "@react-three/cannon"
import { useEffect } from "react"
import { Mesh } from "three"

const BaseBox = ({ ...props }) => {
  const [ref] = useBox((index) => ({
    type: "Static",
    mass: 10,
    restitution: 0,
    onCollide: (e) => {
      // console.log(e)
    },
    ...props,
  }))

  // 박스 노가다의 편의를 위해 추가합니다. 박스 배치 끝나면 지울 예정
  useEffect(() => {
    // do something
    // console.log(1123)
  }, [props.position])

  return (
    <mesh
      castShadow
      position={props.position}
      rotation={props.rotation}
      ref={ref as React.MutableRefObject<Mesh>}
      renderOrder={props.renderOrder}
    >
      <boxGeometry args={props.args} />
      <meshBasicMaterial
        color={props.color}
        transparent={true}
        opacity={props.opacity}
      />
    </mesh>
  )
}

export default BaseBox
