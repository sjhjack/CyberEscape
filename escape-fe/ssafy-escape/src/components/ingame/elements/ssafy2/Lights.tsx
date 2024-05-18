const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight penumbra={0.5} position={[-1200, 10, -1400]} castShadow />
      {/* <directionalLight position={[10, 15, 15]} intensity={5} /> */}
    </>
  )
}

export default Lights
