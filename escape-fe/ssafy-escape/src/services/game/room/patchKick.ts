import API_PATH from "@/constants/path"
// import api from "/api"

interface PatchKickRequestProps {
  roomUuid: string
  userUuid: string
}

interface PatchKickResponseProps {
  status: number
  message: string
  data: string
}

// // 게임방 나가기
// const patchKick = async (
//   data: PatchKickRequestProps,
// ): Promise<PatchKickResponseProps> => {
//   try {
//     const response = await api.patch<PatchKickRequestProps>(
//       API_PATH.GAME.MULTI.ROOM.KICK,
//       data,
//     )
//     if (response.status === 400) {
//       throw new Error(`오류: ${response.data.message}`)
//     }
//     return response.data.data
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }

// export default patchKick
