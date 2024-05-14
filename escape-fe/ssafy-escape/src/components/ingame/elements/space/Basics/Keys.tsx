import Key1 from "../Interactions/Key1"
import Key2 from "../Interactions/Key2"

const Keys = ({
  sequences,
  setSequences,
  setSubtitle,
  setInteractNum,
}: any) => {
  return (
    <>
      {sequences[0].done === false && (
        <Key1
          sequences={sequences}
          setSequences={setSequences}
          setInteractNum={setInteractNum}
          setSubtitle={setSubtitle}
        />
      )}
      {sequences[1].done === true && sequences[2].done === false && (
        <Key2
          sequences={sequences}
          setSequences={setSequences}
          setInteractNum={setInteractNum}
          setSubtitle={setSubtitle}
        />
      )}
    </>
  )
}

export default Keys
