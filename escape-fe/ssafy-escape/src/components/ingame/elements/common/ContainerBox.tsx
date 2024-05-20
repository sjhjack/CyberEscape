// import { useBox } from "@react-three/cannon"
// import { useFrame } from "@react-three/fiber"
// import React, { useEffect, useRef } from "react"
// import { Mesh } from "three"

// const ContainerBox = ({ removeBox, container, index, ...props }: any) => {
//   const [ref] = useBox((index) => ({
//     type: "Dynamic",
//     mass: 0.05,
//     restitution: 1,
//     onCollide: (e) => {
//       // console.log("Box collided, new position:", ref.current.position)
//     },
//     ...props,
//   }))

//   // 박스 노가다의 편의를 위해 추가합니다. 박스 배치 끝나면 지울 예정
//   useEffect(() => {}, [props])

//   return (
//     <mesh
//       castShadow
//       position={props.position}
//       rotation={props.rotation}
//       ref={ref as React.MutableRefObject<Mesh>}
//       renderOrder={props.renderOrder}
//       onClick={() => {
//         removeBox(container, index)
//       }}
//     >
//       <boxGeometry args={props.args} />
//       <meshBasicMaterial
//         color={props.color}
//         // transparent={true}
//         opacity={props.opacity}
//       />
//     </mesh>
//   )
// }

// export default React.memo(ContainerBox)
