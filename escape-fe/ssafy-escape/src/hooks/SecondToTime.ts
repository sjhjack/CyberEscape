// 초를 주면 "00:04:00" 형태로 바꾸어 줌

const SecondToTime = (seconds: number) => {
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60
  return `00:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}

export default SecondToTime