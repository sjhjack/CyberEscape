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
  host: RoomUserInfo
  guest: RoomUserInfo
}

interface RoomUserInfo {
  nickname: string
  profileUrl: string
  uuid: string
}
