import BaseBox from "../common/BaseBox"

const MeshObjects = () => {
  const boxes = [
    {
      position: [10, 12, 0],
      args: [105, 100, 120],
    },
    {
      position: [100, 100, 100],
      rotation: [0, 0, 0],
      args: [0, 0, 0],
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
