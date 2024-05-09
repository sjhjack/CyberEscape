import Cockpit from "../Interactions/Cockpit"
import Computer from "../Interactions/Computer"
import Door1 from "../Interactions/Door1"
import Door2 from "../Interactions/Door2"
import Door3 from "../Interactions/Door3"

const Interactions = ({ sequences, setSequences, setSubtitle }: any) => {
  return (
    <>
      <Cockpit
        position={[-123, 3, 85]}
        sequences={sequences}
        setSequences={setSequences}
        setSubtitle={setSubtitle}
      />
      <Computer />
      <Door1 position={[-7.5, 0, 65]} />
      <Door2 position={[-18, 0, 85]} rotation={[0, Math.PI / 2, 0]} />
      <Door3
        sequences={sequences}
        setSequences={setSequences}
        setSubtitle={setSubtitle}
        position={[-100, 0, 85]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </>
  )
}

export default Interactions
