import { Client } from "@stomp/stompjs"

export const pubSubscribe = (
  client: Client,
  roomUuid: string,
  callback: (data: any) => void,
) => {
  client.subscribe(`/topic/${roomUuid}`, (message) => {
    const data = JSON.parse(message.body)
    callback(data)
  })
}

// pubJoin.ts
export const pubJoin = (client: Client, roomUuid: string, userInfo: any) => {
  client.publish({
    destination: `/pub/room.connect`,
    body: JSON.stringify(userInfo),
  })
}

// pubKick.ts
export const pubKick = (client: Client, roomUuid: string, userUuid: string) => {
  client.publish({
    destination: `/pub/room.kickGuest`,
    body: JSON.stringify({ userUuid }),
  })
}

// pubChange.ts
export const pubChangeHost = (
  client: Client,
  roomUuid: string,
  newHostUuid: string,
) => {
  client.publish({
    destination: `/pub/room.delegateHost`,
    body: JSON.stringify({ newHostUuid }),
  })
}
