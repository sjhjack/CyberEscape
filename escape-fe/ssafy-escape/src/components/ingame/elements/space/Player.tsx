// import React, { useRef, useEffect } from "react"
// import { BoxGeometry, MeshBasicMaterial, Mesh, MathUtils } from "three"
// import { Vec3, Box, Body, Quaternion } from "cannon-es"

// const Player = ({ info }: any) => {
//   const meshRef = useRef()
//   const cannonBodyRef = useRef(null)

//   useEffect(() => {
//     const {
//       name,
//       width,
//       height,
//       depth,
//       color,
//       differenceY,
//       x,
//       y,
//       z,
//       rotationX,
//       rotationY,
//       rotationZ,
//       mass,
//       cannonWorld,
//       cannonMaterial,
//       scene,
//     } = info

//     const geometry = new BoxGeometry(width, height, depth)
//     const material = new MeshBasicMaterial({
//       transparent: false,
//       opacity: 1,
//       color,
//     })
//     const mesh = new Mesh(geometry, material)
//     mesh.position.set(x, y, z)
//     mesh.rotation.set(rotationX, rotationY, rotationZ)
//     meshRef.current = mesh
//     scene.add(mesh)

//     setCannonBody()

//     return () => {
//       scene.remove(mesh)
//       if (cannonBodyRef.current) {
//         cannonWorld.removeBody(cannonBodyRef.current)
//       }
//     }
//   }, [])

//   const walk = (value, direction) => {
//     const { rotationY } = info
//     if (direction === "left") {
//       info.rotationY -= MathUtils.degToRad(90)
//     }
//     if (direction === "right") {
//       info.rotationY += MathUtils.degToRad(90)
//     }

//     info.x += Math.sin(rotationY) * value
//     info.z += Math.cos(rotationY) * value
//     if (cannonBodyRef.current) {
//       cannonBodyRef.current.position.x = info.x
//       cannonBodyRef.current.position.z = info.z
//     }
//   }

//   const setCannonBody = () => {
//     const {
//       x,
//       y,
//       z,
//       width,
//       height,
//       depth,
//       rotationX,
//       rotationY,
//       rotationZ,
//       mass,
//       cannonWorld,
//       cannonMaterial,
//     } = info

//     const cannonBody = new Body({
//       mass,
//       position: new Vec3(x, y, z),
//       shape: new Box(new Vec3(width / 2, height / 2, depth / 2)),
//       material: cannonMaterial,
//     })

//     const quatX = new Quaternion()
//     const axisX = new Vec3(1, 0, 0)
//     quatX.setFromAxisAngle(axisX, rotationX)

//     const quatY = new Quaternion()
//     const axisY = new Vec3(0, 1, 0)
//     quatY.setFromAxisAngle(axisY, rotationY)

//     const quatZ = new Quaternion()
//     const axisZ = new Vec3(0, 0, 1)
//     quatZ.setFromAxisAngle(axisZ, rotationZ)

//     const combinedQuat = quatX.mult(quatY).mult(quatZ)
//     cannonBody.quaternion = combinedQuat

//     cannonBodyRef.current = cannonBody

//     cannonWorld.addBody(cannonBody)
//   }

//   return null
// }

// export default Player
