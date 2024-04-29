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
      UPDATE_RANK: "/rank/update"
    },
    NICKNAME: {
      DUPLICATION: "/user/nickname/duplication",
      AUTO_CREATE: "/user/nickname",
      CHANGE: "/user/change",
    },
  },
  INVITE: {
    INVITED_LIST: "/notification/game",
    INVITED_ACCEPT: "/room/acceptance",
  },
}

export default API_PATH
