import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
})
api.interceptors.response.use(
  (response) => response, // 성공 응답은 그대로 반환
  async (error) => {
    // 에러 응답이 401 (Unauthorized)인 경우에만 재시도 로직 수행
    const originalRequest = error.config

    // 401 오류이고, retry를 위한 플래그가 없는 경우에만 재시도
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true // 무한 루프 방지

      // 리프레시 토큰을 가져오기 위한 API 요청
      const refreshToken = sessionStorage.getItem("refresh_token")
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/refresh",
          {
            refresh_token: refreshToken,
          },
        )

        // 새 액세스 토큰을 세션 스토리지에 저장
        const newAccessToken = response.data.access_token
        sessionStorage.setItem("access_token", newAccessToken)

        // 새 토큰을 기존 요청 헤더에 설정
        originalRequest.headers["access_token"] = newAccessToken

        // 실패한 요청을 새로운 액세스 토큰으로 재시도
        return api(originalRequest)
      } catch (refreshError) {
        console.error("Refresh token request failed", refreshError)
        // 리프레시 토큰이 만료된 경우, 사용자에게 로그인 페이지로 이동 요청 또는 로그아웃 처리
        // window.location.href = "/login"; // 필요에 따라 라우팅 처리
      }
    }
    // 다른 종류의 에러에 대해서는 기본적으로 에러를 반환
    return Promise.reject(error)
  },
)

export default api
