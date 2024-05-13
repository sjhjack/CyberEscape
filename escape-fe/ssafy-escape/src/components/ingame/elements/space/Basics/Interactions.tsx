import Cockpit from "../Interactions/Cockpit"
import Computer from "../Interactions/Computer"
import Door1 from "../Interactions/Door1"
import Door2 from "../Interactions/Door2"
import Door3 from "../Interactions/Door3"
import Door4 from "../Interactions/Door4"
import Door5 from "../Interactions/Door5"
import Door6 from "../Interactions/Door6"

const Interactions = ({
  onAir,
  setOnAir,
  sequences,
  setSequences,
  setSubtitle,
  setInteractNum,
}: any) => {
  return (
    <>
      <Cockpit
        position={[-105, 3, -72.5]}
        onAir={onAir}
        setOnAir={setOnAir}
        sequences={sequences}
        setSequences={setSequences}
        setSubtitle={setSubtitle}
        setInteractNum={setInteractNum}
      />
      <Computer
        position={[-43, 4, -162.9]}
        onAir={onAir}
        setOnAir={setOnAir}
        sequences={sequences}
        setSequences={setSequences}
        setSubtitle={setSubtitle}
        setInteractNum={setInteractNum}
      />
      <Door1
        position={[-17, 0, 0.4]}
        rotation={[0, Math.PI / 2, 0]}
        setInteractNum={setInteractNum}
      />
      <Door2
        position={[-58, 0, 0.4]}
        rotation={[0, Math.PI / 2, 0]}
        setInteractNum={setInteractNum}
      />
      <Door3
        onAir={onAir}
        setOnAir={setOnAir}
        sequences={sequences}
        setSequences={setSequences}
        setSubtitle={setSubtitle}
        position={[-81, 0, -72.5]}
        rotation={[0, Math.PI / 2, 0]}
        setInteractNum={setInteractNum}
      />
      <Door4 position={[-38, 0, -34]} setInteractNum={setInteractNum} />
      <Door5 position={[-38, 0, -100]} setInteractNum={setInteractNum} />
      <Door6
        position={[3, 0, -72.5]}
        rotation={[0, Math.PI / 2, 0]}
        setInteractNum={setInteractNum}
      />
    </>
  )
}

export default Interactions
