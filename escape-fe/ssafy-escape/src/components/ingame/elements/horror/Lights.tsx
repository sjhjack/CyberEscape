interface LightProps {
  fanalty: number
  solved: number
}

const Lights = ({ fanalty, solved }: LightProps) => {
  return (
    <>
      {solved >= 2 ? (
        <ambientLight intensity={0.1} />
      ) : (
        <ambientLight intensity={0.5} />
      )}
      {fanalty <= 1 ? (
        <directionalLight position={[6, 15, 5]} intensity={1} receiveShadow />
      ) : null}
    </>
  )
}

export default Lights
