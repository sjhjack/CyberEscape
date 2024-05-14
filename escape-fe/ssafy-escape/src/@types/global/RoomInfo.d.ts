interface RoomInfo {
  roomUuid: string
  thema: string
  nickname: string
  isStarted: boolean
  title: string
  capacity: number
}

interface PubResponseData {
  hostSessionId: string
  guestSessionId: string
  hostProgress: number
  guestProgress: number
  hostReady: number
  guestReady: number
  host: RoomUserInfo
  guest: RoomUserInfo
  kicked: boolean
}

interface RoomUserInfo {
  nickname: string
  profileUrl: string
  uuid: string
}
