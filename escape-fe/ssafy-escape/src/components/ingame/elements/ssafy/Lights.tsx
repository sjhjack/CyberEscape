const Lights = () => {
  return (
    <>
      <ambientLight intensity={1} />
      {/* <spotLight penumbra={0.5} position={[-1200, 10, -1400]} castShadow /> */}
      <directionalLight position={[10, 15, 15]} intensity={10} />
    </>
  )
}

export default Lights
