interface KeyProps {
  position: [number, number, number]
  active: boolean
}

const Keys: KeyProps[] = [
  {
    active: true,
    position: [0.88, 1.15, 3.8],
  },
  {
    active: false,
    position: [4, 0, 0],
  },
  {
    active: false,
    position: [6, 0, 0],
  },
]

export default Keys
