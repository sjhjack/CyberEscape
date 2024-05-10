import Problem1 from "../Interactions/Problem1"

const Problems = ({
  sequences,
  setSequences,
  setInteractNum,
  setSubtitle,
}: any) => {
  const url1 = "/image/problem.png"

  return (
    <>
      {sequences[1].done === true && sequences[3].done === false ? (
        <Problem1
          url={url1}
          position={[-9, 4.6, 75.6]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[3.6, 1.2, 3]}
          sequences={sequences}
          setSequences={setSequences}
          setSubtitle={setSubtitle}
          setInteractNum={setInteractNum}
        />
      ) : null}
    </>
  )
}

export default Problems
