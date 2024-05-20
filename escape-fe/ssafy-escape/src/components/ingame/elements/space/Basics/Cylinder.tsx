import * as THREE from "three"

const CylinderGlass = ({ position }: any) => {
  return (
    <mesh position={position}>
      <cylinderGeometry attach="geometry" args={[4, 4, 21, 64]} />
      <meshPhysicalMaterial
        attach="material"
        color="white"
        metalness={0.9}
        roughness={0.05}
        envMapIntensity={0.9}
        clearcoat={1}
        transparent
        opacity={0.5}
        reflectivity={0.2}
        // refractionRatio={0.985}
        ior={0.9}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

export default CylinderGlass
