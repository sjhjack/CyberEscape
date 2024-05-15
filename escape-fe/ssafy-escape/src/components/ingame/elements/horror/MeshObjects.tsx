import BaseBox from "../common/BaseBox"

const MeshObjects = () => {
  const boxes = [
    {
      position: [-40, -0.5, 7],
      args: [70, 180, 40],
    },
    {
      position: [25, -0.5, 88],
      args: [105, 180, 10],
    },
    {
      position: [68, -0.5, 5],
      rotation: [0, 33, 0],
      args: [175, 180, 10],
    },
    {
      position: [0, -0.5, -85],
      args: [155, 180, 10],
    },
    {
      position: [-80, -0.5, -20],
      rotation: [0, 33, 0],
      args: [125, 180, 10],
    },
    {
      position: [-50, -0.5, 68],
      rotation: [0, 8.7, 0],
      args: [80, 180, 10],
    },
    {
      position: [-12, -0.5, 52],
      rotation: [0, 8.9, 0],
      args: [30, 180, 20],
    },
    {
      position: [-54, -0.5, 50],
      rotation: [0, 8.6, 0],
      args: [23, 180, 20],
    },
    {
      position: [-30, -0.5, -28],
      rotation: [0, 8.6, 0],
      args: [23, 180, 5],
    },
    {
      position: [-52, -0.5, -28],
      rotation: [0, 7, 0],
      args: [23, 180, 5],
    },
    {
      position: [-80, -0.5, -59],
      rotation: [0, 6.3, 0],
      args: [23, 180, 20],
    },
  ]

  return (
    <>
      {boxes.map((box, index) => (
        <BaseBox
          key={index}
          position={box.position}
          rotation={box.rotation}
          args={box.args}
          color="red"
          opacity={0}
          renderOrder={1}
        />
      ))}
    </>
  )
}

export default MeshObjects
