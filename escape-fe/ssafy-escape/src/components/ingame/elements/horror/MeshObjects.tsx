import BaseBox from "../common/BaseBox"

const MeshObjects = () => {
  const boxes = [
    {
      position: [-40, -0.5, 7],
      args: [70, 40, 40],
      color: "red",
      renderOrder: 1,
    },
    {
      position: [25, -0.5, 88],
      args: [105, 150, 10],
      color: "red",
      renderOrder: 1,
    },
    {
      position: [68, -0.5, 5],
      rotation: [0, 33, 0],
      args: [175, 150, 10],
      color: "red",
      renderOrder: 1,
    },
    {
      position: [0, -0.5, -85],
      args: [155, 150, 10],
      color: "red",
      renderOrder: 1,
    },
    {
      position: [-80, -0.5, -20],
      rotation: [0, 33, 0],
      args: [125, 150, 10],
      color: "red",
      renderOrder: 1,
    },
    {
      position: [-50, -0.5, 68],
      rotation: [0, 8.7, 0],
      args: [80, 150, 10],
      color: "red",
      renderOrder: 1,
    },
    {
      position: [-12, -0.5, 52],
      rotation: [0, 8.9, 0],
      args: [30, 70, 20],
      color: "red",
      renderOrder: 1,
    },
    {
      position: [-54, -0.5, 50],
      rotation: [0, 8.6, 0],
      args: [23, 70, 20],
      color: "red",
      renderOrder: 1,
    },
    {
      position: [-30, -0.5, -28],
      rotation: [0, 8.6, 0],
      args: [23, 120, 5],
      color: "red",
      renderOrder: 1,
    },
    {
      position: [-52, -0.5, -28],
      rotation: [0, 7, 0],
      args: [23, 120, 5],
      color: "red",
      renderOrder: 1,
    },
    {
      position: [-80, -0.5, -59],
      rotation: [0, 6.3, 0],
      args: [23, 70, 20],
      color: "red",
      renderOrder: 1,
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
          color={box.color}
          opacity={0}
          renderOrder={box.renderOrder}
        />
      ))}
    </>
  )
}

export default MeshObjects
