import Cockpit from "../Interactions/Cockpit"
import Computer from "../Interactions/Computer"
import Door1 from "../Interactions/Door1"
import Door2 from "../Interactions/Door2"
import Door3 from "../Interactions/Door3"

const Interactions = () => {
  return (
    <>
      {/* <Cockpit position={[-130, 0, 85]} /> */}
      <Computer />
      <Door1 position={[-7.5, 0, 65]} />
      <Door2 position={[-18, 0, 85]} rotation={[0, Math.PI / 2, 0]} />
      <Door3 position={[-100, 0, 85]} rotation={[0, Math.PI / 2, 0]} />
    </>
  )
}

export default Interactions
