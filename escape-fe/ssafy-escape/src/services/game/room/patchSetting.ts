import API_PATH from "@/constants/path"
// import api from "/api"

interface PatchSettingDataProps {
  title: string
}
interface PatchSettingRequestProps {
  title: string
  password: string
  themaUuid: string
  roomUuid: string
}

interface PatchSettingResponseProps {
  status: number
  message: string
  data: PatchSettingDataProps[]
}

// // 게임방 나가기
// const patchSetting = async (
//   data: PatchSettingRequestProps,
// ): Promise<PatchSettingResponseProps> => {
//   try {
//     const response = await api.patch<PatchSettingRequestProps>(
//       API_PATH.GAME.MULTI.ROOM.SETTING,
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

// export default patchSetting
