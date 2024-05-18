import BaseBox from "../../common/BaseBox"
import Server from "../Backgrounds/Server"
import CylinderGlass from "./Cylinder"

const MeshObjects = () => {
  return (
    <>
      <BaseBox
        position={[1, 2, -12]}
        args={[35, 7, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[16, 2, 0]}
        args={[1, 7, 30]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-23, 2, 13.5]}
        args={[80, 7, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-60, 2, 0]}
        args={[1, 7, 30]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-18, 2, 10]}
        args={[1, 7, 10]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-18, 2, -9]}
        args={[1, 7, 10]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-17, 2, -35]}
        args={[32, 7, 40]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-57, 2, -35]}
        args={[32, 7, 40]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-83.5, 2, -57]}
        args={[49, 7, 23]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-83.5, 2, -88]}
        args={[49, 7, 23]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[1, 2, -47]}
        args={[38, 7, 43]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[1, 2, -88]}
        args={[38, 7, 22]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[84, 2, -65]}
        args={[1, 7, 69]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[55, 2, -30]}
        args={[70, 7, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[55, 2, -101]}
        args={[70, 7, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-15, 2, -101]}
        args={[36, 7, 20]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-59, 2, -101]}
        args={[32, 7, 20]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[2, 2, -150]}
        args={[1, 7, 80]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-25, 2, -183]}
        args={[80, 7, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-65, 2, -150]}
        args={[1, 7, 80]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-43, 2, -119]}
        args={[1, 7, 25]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-23, 2, -141]}
        args={[1, 7, 20]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-35, 2, -133]}
        args={[20, 7, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-109.5, 2, -73]}
        args={[1, 7, 10]}
        color={"red"}
        opacity={0}
      />

      {/** 엔진실 중앙 */}
      <BaseBox
        position={[59, 2, -65]}
        args={[8, 7, 8]}
        color={"red"}
        opacity={0}
      />

      {/** 서버실 컨테이너들 */}
      <BaseBox
        position={[-6, 2, -117]}
        args={[11, 7, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-6, 2, -125]}
        args={[11, 7, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-6, 2, -131.5]}
        args={[11, 7, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-6, 2, -138]}
        args={[11, 7, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-6, 2, -145]}
        args={[11, 7, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-6, 2, -152]}
        args={[11, 7, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-6, 2, -157]}
        args={[11, 7, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-41, 2, -174]}
        args={[8, 7, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-54, 2, -174]}
        args={[8, 7, 1]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-51, 2, -119]}
        args={[1, 7, 10]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-57, 2, -119]}
        args={[1, 7, 10]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-51, 2, -134.5]}
        args={[1, 7, 10]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-57, 2, -134.5]}
        args={[1, 7, 10]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-6, 2, -175]}
        args={[1, 7, 10]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-11, 2, -175]}
        args={[1, 7, 10]}
        color={"red"}
        opacity={0}
      />
      <BaseBox
        position={[-16, 2, -175]}
        args={[1, 7, 10]}
        color={"red"}
        opacity={0}
      />

      <Server />
      <CylinderGlass position={[59, 0, -65]} />
    </>
  )
}

export default MeshObjects
