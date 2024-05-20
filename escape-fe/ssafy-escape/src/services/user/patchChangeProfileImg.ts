import API_PATH from "@/constants/path"
import api from "@/services/api"

interface patchChangeProfileImgResponseProps {
  status: number
  message: string
  data: string
}
// 프로필 사진 변경
const patchChangeProfileImg = async (
  file: File | undefined,
): Promise<string> => {
  if (file) {
    const formData = new FormData()
    formData.append("multipartFile", file)
    try {
      const response = await api.patch<patchChangeProfileImgResponseProps>(
        API_PATH.MAIN.PROFILE_IMG_CHANGE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      if (response.data.status === 400) {
        throw new Error(`오류: ${response.data.message}`)
      }
      return response.data.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  return "파일을 올려주세요."
}

export default patchChangeProfileImg
