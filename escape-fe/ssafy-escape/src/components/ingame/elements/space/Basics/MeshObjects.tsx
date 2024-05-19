import BaseBox from "../../common/BaseBox"
import Server from "../Backgrounds/Server"
import CylinderGlass from "./Cylinder"

const MeshObjects = () => {
  return (
    <>
      <BaseBox
        position={[1, -1, -12]}
        args={[35, 17, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[16, -1, 0]}
        args={[1, 17, 30]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-23, -1, 13.5]}
        args={[80, 17, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-60, -1, 0]}
        args={[1, 17, 30]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-18, -1, 10]}
        args={[1, 17, 10]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-18, -1, -9]}
        args={[1, 17, 10]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-17, -1, -35]}
        args={[32, 17, 40]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-57, -1, -35]}
        args={[32, 17, 40]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-83.5, -1, -57]}
        args={[49, 17, 23]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-83.5, -1, -88]}
        args={[49, 17, 23]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[1, -1, -47]}
        args={[38, 17, 43]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[1, -1, -88]}
        args={[38, 17, 22]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[84, -1, -65]}
        args={[1, 17, 69]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[55, -1, -30]}
        args={[70, 17, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[55, -1, -101]}
        args={[70, 17, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-15, -1, -101]}
        args={[36, 17, 20]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-59, -1, -101]}
        args={[32, 17, 20]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[2, -1, -150]}
        args={[1, 17, 80]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-25, -1, -183]}
        args={[80, 17, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-65, -1, -150]}
        args={[1, 17, 80]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-43, -1, -119]}
        args={[1, 17, 25]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-23, -1, -141]}
        args={[1, 17, 20]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-35, -1, -133]}
        args={[20, 17, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-109.5, -1, -73]}
        args={[1, 17, 10]}
        color={"red"}
        opacity={0}
      />

      {/** 엔진실 중앙 */}
      <BaseBox
        position={[59, -1, -65]}
        args={[8, 17, 8]}
        color={"red"}
        opacity={0}
      />

      {/** 서버실 컨테이너들 */}
      <BaseBox
        position={[-6, -1, -117]}
        args={[11, 17, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-6, -1, -125]}
        args={[11, 17, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-6, -1, -131.5]}
        args={[11, 17, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-6, -1, -138]}
        args={[11, 17, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-6, -1, -145]}
        args={[11, 17, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-6, -1, -152]}
        args={[11, 17, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-6, -1, -157]}
        args={[11, 17, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-41, -1, -174]}
        args={[8, 17, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-54, -1, -174]}
        args={[8, 17, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-51, -1, -119]}
        args={[1, 17, 10]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-57, -1, -119]}
        args={[1, 17, 10]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-51, -1, -134.5]}
        args={[1, 17, 10]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-57, -1, -134.5]}
        args={[1, 17, 10]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-6, -1, -175]}
        args={[1, 17, 10]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-11, -1, -175]}
        args={[1, 17, 10]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-16, -1, -175]}
        args={[1, 17, 10]}
        color={"red"}
        opacity={0}
      />

      <Server />
      <CylinderGlass position={[59, 0, -65]} />
    </>
  )
}

export default MeshObjects
