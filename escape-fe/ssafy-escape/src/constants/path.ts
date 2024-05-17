const API_PATH = {
  AUTH: {
    SIGNUP: "/auth/signup",
    LOGIN: "/auth/signin",
    LOGOUT: "/auth/logout",
    REFRESH_ACCESSTOKEN: "/auth/refresh",
    QUIT: "/auth/quit",
  },
  MAIN: {
    FRIEND: {
      LIST: "/friend/list",
      DELETE: "/friend/remove",
      REQUEST: "/friend/request",
      ADDITION: "/friend/acceptance",
      SEARCH: "/user/search",
    },
    NOTIFICATION:{
      SUBSCRIBE: "/notify/subscribe",
      READ: "notify/read",
      LIST: "/notify/list"
    },
    RANKING: {
      LIST: "/rankings",
      MY_RANK: "/rank/myrank",
      UPDATE_RANK: "/rank/update",
    },
    NICKNAME: {
      DUPLICATION: "/user/nickname/duplication",
      AUTO_CREATE: "/user/nickname",
      CHANGE: "/user/change",
    },
    PROFILE_IMG_CHANGE: "/user/image/change",
  },
  GAME: {
    MULTI: {
      ROOM: {
        LIST: "/room",
        INVITE: "/room/invitation",
        ACCEPT: "/room/acceptance",
        JOIN: "/room/join",
        EXIT: "/room/exit",
        KICK: "/room/kick",
        SETTING: "/room/setting",
        CHANGE_HOST: "/room/change/host",
        START: "/room/start",
      },
      VOICE: {
        SESSION: "/voice/init/session",
        CONNECTION: "/voice/connection",
      },
    },
  },
  // INVITE: {
  //   INVITED_LIST: "/notification/game",
  //   INVITED_ACCEPT: "/room/acceptance",
  // },
  INGAME: {
    QUIZ: "/game/quiz",
    HINT: "/game/quiz/hint",
    ANSWER: "/game/quiz/answer",
    FINAL_ANSWER: "/game/quiz/final/answer",
  },
}

export default API_PATH
