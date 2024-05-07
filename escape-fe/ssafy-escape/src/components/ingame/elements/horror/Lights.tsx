interface LightProps {
  isFanalty: boolean
}

const Lights = ({ isFanalty }: LightProps) => {
  return (
    <>
      <ambientLight intensity={1} />
      {!isFanalty ? (
        <directionalLight position={[6, 15, 5]} intensity={1} receiveShadow />
      ) : null}
    </>
  )
}

export default Lights
