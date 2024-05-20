interface LightProps {
  penalty: number
  solved: number
}

const Lights = ({ penalty, solved }: LightProps) => {
  return (
    <>
      {solved >= 2 ? (
        <ambientLight intensity={0.1} />
      ) : (
        <ambientLight intensity={0.5} />
      )}
      {penalty === 0 ? (
        <directionalLight position={[6, 15, 5]} intensity={1} receiveShadow />
      ) : null}
    </>
  )
}

export default Lights
