import Swal from "sweetalert2"
import API_PATH from "@/constants/path"
import api from "@/services/api"

interface PatchJoinRequestProps {
  roomUuid: string
  userUuid: string
  password: string
}

interface NullBodyProps {
  status: number
  message: string
}

// 게임방 참여하기
const patchJoin = async (
  data: PatchJoinRequestProps,
): Promise<NullBodyProps> => {
  try {
    const response = await api.patch<NullBodyProps>(
      API_PATH.GAME.MULTI.ROOM.JOIN,
      data,
    )
    console.log(response)
    if (response.data.status === 400) {
      Swal.fire({
        icon: "error",
        title: "오류",
        text: response.data.message,
      })
      throw new Error(`오류: ${response.data.message}`)
    } else if (response.data.status === 8000) {
      Swal.fire({
        icon: "error",
        title: "오류",
        text: response.data.message,
      })
      throw new Error(`오류: ${response.data.message}`)
    } else if (response.data.status === 8001) {
      Swal.fire({
        icon: "error",
        title: "오류",
        text: response.data.message,
      })
      throw new Error(`오류: ${response.data.message}`)
    }
    return response.data
  } catch (error: any) {
    if (!error.response) {
      Swal.fire({
        icon: "error",
        text: error.message,
      })
    }
    console.error(error)
    throw error
  }
}

export default patchJoin
