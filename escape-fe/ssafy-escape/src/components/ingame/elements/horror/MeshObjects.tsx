
import BaseBox from "../common/BaseBox"

const MeshObjects = () => {
  return (
    <>
      <BaseBox
        position={[-60, -0.5, 6]}
        args={[110, 40, 40]}
        color={"red"}
        opacity={0.5}
        renderOrder={1}
      />
    </>
  )
}

export default MeshObjects

//-60, -0.5, 6
