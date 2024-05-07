// 마지막 콤마+2부터 물음표까지 하나의 문자열으로 반환
// 사용예시: "16+9 = 1, 8+6 = 2, 14+13 = 3, 4+11 = ?" -> "4+11 = ?"

const extractSubstring = (s: string): string => {
    const lastIndex = s.lastIndexOf(",")
    return s.slice(lastIndex + 2, s.indexOf("?", lastIndex) + 1)
  }

export default extractSubstring