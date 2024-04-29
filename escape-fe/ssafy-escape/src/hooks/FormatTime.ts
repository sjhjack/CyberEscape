const formatTime = (time: string) => {
  const parts = time.split(":")

  let minutes = parseInt(parts[1], 10)
  let seconds = parseInt(parts[2], 10)

  return `${minutes}분 ${seconds}초`
}
export default formatTime
