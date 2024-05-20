const Lights = () => {
  return (
    <>
      <ambientLight intensity={1} />
      {/* <spotLight
        penumbra={0}
        position={[-50, 10, -180]}
        intensity={100}
        color={"red"}
      /> */}
      <directionalLight position={[5, 10, 7.5]} />
      <directionalLight position={[-59, 100, -40]} />
      {/* <pointLight
        position={[-500, 10, -180]}
        intensity={100000}
        color={"red"}
      /> */}
    </>
  )
}

export default Lights
