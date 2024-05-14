// 분과 초를 주면 "00:MM:SS" 형태로 바꾸어주는 함수
const RequestFormatTime = (minutes: number, seconds: number): string => {
  const padNumber = (num: number) => num.toString().padStart(2, "0")
  return `00:${padNumber(minutes)}:${padNumber(seconds)}`
}

export default RequestFormatTime
