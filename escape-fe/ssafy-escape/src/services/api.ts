"use client"
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import useUserStore from "@/stores/UserStore"
// AxiosRequestConfig 타입 확장
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}
const baseURL = process.env.NEXT_PUBLIC_URL

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useUserStore.getState()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)
api.interceptors.response.use(
  async (response: AxiosResponse) => {
    // 응답의 status가 6001인 경우 리프레시 토큰 요청을 수행
    if (response.data.status === 6001) {
      const originalRequest = response.config as CustomAxiosRequestConfig
      if (!originalRequest._retry) {
        originalRequest._retry = true // 무한 루프 방지

        // 리프레시 토큰을 가져오기 위한 API 요청
        const refreshToken = sessionStorage.getItem("refresh_token")
        const { accessToken } = useUserStore.getState()
        console.log("리프레시 토큰", refreshToken)
        try {
          const refreshResponse = await axios
            .post(
              `${api.defaults.baseURL}/auth/refresh`,
              { refreshToken: refreshToken },
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              },
            )
            .then((response) => {
              // Additional logic here
              console.log(response)
              if (response.data.data !== "") {
                const newAccessToken = response.data.data.accessToken
                const newRefreshToken = response.data.data.refreshToken
                sessionStorage.setItem("access_token", newAccessToken)
                sessionStorage.setItem("refresh_token", newRefreshToken)
                originalRequest.headers["Authorization"] =
                  `Bearer ${newAccessToken}`
                console.log("refreshed")
              }

              // Return the modified config object
              return originalRequest
            })

          // 실패한 요청을 새로운 액세스 토큰으로 재시도
          return api(refreshResponse)
        } catch (refreshError) {
          console.error("Refresh token request failed", refreshError)
          // 리프레시 토큰이 만료된 경우, 사용자에게 로그인 페이지로 이동 요청 또는 로그아웃 처리
          // window.location.href = "/login"; // 필요에 따라 라우팅 처리
        }
      }
    }
    return response // 성공 응답은 그대로 반환
  },
  (error) => {
    return Promise.reject(error) // 다른 종류의 에러에 대해서는 기본적으로 에러를 반환
  },
)

export default api
