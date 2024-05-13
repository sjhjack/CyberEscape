import BaseBox from "../common/BaseBox"

const MeshObjects = () => {
  const boxes = [
    {
      position: [-70, 40, 5],
      rotation: [0, 0, 0],
      args: [50, 180, 70],
    },
    {
      position: [-25, 40, 50],
      rotation: [0, 33, 0],
      args: [30, 180, 42],
    },
    {
      position: [40, 40, 70],
      rotation: [0, 0, 0],
      args: [120, 180, 30],
    },
    {
      position: [90, 40, 0],
      rotation: [0, 0, 0],
      args: [30, 180, 120],
    },
    {
      position: [60, 40, -75],
      rotation: [0, 33, 0],
      args: [60, 180, 70],
    },
    {
      position: [-20, 40, -95],
      rotation: [0, 33, 0],
      args: [80, 180, 180],
    },
    {
      position: [-100, 40, -30],
      rotation: [0, 0, 0],
      args: [50, 180, 50],
    },
    {
      position: [45, 40, 45],
      rotation: [0, 0, 0],
      args: [50, 180, 20],
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
