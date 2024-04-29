const API_PATH = {
  AUTH: {
    SIGNUP: "/auth/signup",
    LOGIN: "/auth/signin",
    LOGOUT: "/auth/logout",
  },
  MAIN: {
    FRIEND: {
      LIST: "/friend/list",
      DELETE: "/friend/remove",
      REQUEST: "/friend/request",
      ADDITION: "/friend/addition",
      SEARCH: "/user/search",
      NOTIFICATION: "/notification/friend",
    },
    RANKING: {
      LIST: "/rankings",
      MY_RANK: "/rank/myrank",
      UPDATE_RANK: "/rank/update",
    },
  },
  GAME: {
    MULTI: {
      ROOM: {
        LIST: "/room",
        INVITE: "room/invite",
        ACCEPT: "room/invite",
        JOIN: "room/join",
        EXIT: "room/exit",
        KICK: "room/exit",
        SETTING: "room/eixt",
        CHANGE_HOST: "room/change/host",
        START: "room/start",
      },
    },
  },
}

export default API_PATH
