// import API_PATH from "@/constants/path"
// import api from "/api"

interface deleteRoomRequestProps {
  roomUuid: string
  userUuid: string
}

// // 방 삭제하기
// const deleteRoom = async (
//   data: deleteRoomRequestProps,
// ): Promise<NullBodyProps> => {
//   try {
//     const response = await api.delete<NullBodyProps>(
//       API_PATH.GAME.MULTI.ROOM.LIST,
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

// export default deleteRoom
