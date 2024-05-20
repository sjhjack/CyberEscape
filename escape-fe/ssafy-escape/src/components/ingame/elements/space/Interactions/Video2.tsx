import { useTexture, useVideoTexture } from "@react-three/drei"
import { Suspense } from "react"

const Video2 = ({ url, position, rotation, scale }: any) => {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[0.5, 1.01]} />
      <Suspense fallback={<FallbackMaterial />}>
        <VideoMaterial url={url} />
      </Suspense>
    </mesh>
  )
}

const VideoMaterial = ({ url }: any) => {
  const texture = useVideoTexture(url)
  return <meshBasicMaterial map={texture} toneMapped={false} />
}

export default Video2

function FallbackMaterial() {
  const fallbackURL = process.env.NEXT_PUBLIC_IMAGE_URL + "/image/Black.png"
  const texture = useTexture(fallbackURL)
  return <meshBasicMaterial map={texture} toneMapped={false} />
}
