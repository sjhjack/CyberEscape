import { useThree } from "@react-three/fiber"
import * as THREE from "three"

interface IntersectProp {
  event: MouseEvent
  objects: any
}

function getIntersections({ event, objects }: IntersectProp) {
  const { camera } = useThree()

  var vector = new THREE.Vector2()

  vector.set(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1,
  )

  var raycaster = new THREE.Raycaster()
  raycaster.setFromCamera(vector, camera)

  var intersects = raycaster.intersectObjects(objects)

  return intersects
}

export default getIntersections
