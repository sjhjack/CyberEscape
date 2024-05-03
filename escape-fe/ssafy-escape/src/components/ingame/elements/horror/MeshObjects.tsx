import BaseBox from "../common/BaseBox"

const MeshObjects = () => {
  return (
    <>
      <BaseBox
        position={[-40, -0.5, 7]}
        args={[70, 40, 40]}
        color={"red"}
        opacity={0}
        renderOrder={1}
      />
    </>
  )
}

export default MeshObjects

//-60, -0.5, 6
