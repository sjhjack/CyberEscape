import Cockpit from "../Interactions/Cockpit"
import Computer from "../Interactions/Computer"
import Door1 from "../Interactions/Door1"
import Door2 from "../Interactions/Door2"
import Door3 from "../Interactions/Door3"

const Interactions = ({
  sequences,
  setSequences,
  setSubtitle,
  setInteractNum,
}: any) => {
  return (
    <>
      <Cockpit
        position={[-123, 3, 85]}
        sequences={sequences}
        setSequences={setSequences}
        setSubtitle={setSubtitle}
        setInteractNum={setInteractNum}
      />
      <Computer />
      <Door1 position={[-7.5, 0, 65]} setInteractNum={setInteractNum} />
      <Door2
        position={[-18, 0, 85]}
        rotation={[0, Math.PI / 2, 0]}
        setInteractNum={setInteractNum}
      />
      <Door3
        sequences={sequences}
        setSequences={setSequences}
        setSubtitle={setSubtitle}
        position={[-100, 0, 85]}
        rotation={[0, Math.PI / 2, 0]}
        setInteractNum={setInteractNum}
      />
    </>
  )
}

export default Interactions
