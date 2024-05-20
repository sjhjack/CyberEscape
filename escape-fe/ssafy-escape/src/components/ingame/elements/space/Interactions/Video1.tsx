import { useAspect, useVideoTexture } from "@react-three/drei"
// import { Suspense } from "react"

const Video1 = ({ url, position, rotation, scale }: any) => {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[0.5, 1.01]} />
      <VideoMaterial url={url} />
    </mesh>
  )
}
const VideoMaterial = ({ url }: any) => {
  const texture = useVideoTexture(url)
  return <meshBasicMaterial map={texture} toneMapped={false} />
}

export default Video1

// function FallbackMaterial({ url }: any) {
//   const texture = useTexture(url)
//   return <meshBasicMaterial map={texture} toneMapped={false} />
// }
