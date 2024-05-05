const Lights = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <spotLight
        penumbra={0}
        position={[-20, 10, 10]}
        intensity={10000}
        color={"red"}
      />
      <directionalLight position={[5, 10, 7.5]} />
    </>
  )
}

export default Lights
