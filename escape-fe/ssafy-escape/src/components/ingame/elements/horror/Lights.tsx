const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      {/* <pointLight position={[10, 10, 10]} intensity={1} /> */}
      <directionalLight position={[6, 15, 5]} intensity={1} receiveShadow />
    </>
  )
}

export default Lights
