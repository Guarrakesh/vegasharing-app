export default {
  ROOMS: {
    GET_MANY: "/rooms",
    GET_ONE: "/rooms/:id",
    POST: "/rooms/create",
    DELETE: "/rooms",
  },

  AUTH: {
    LOGIN: "/authentication/login",
    REGISTER: "/authentication/register",
    REFRESH_TOKEN: "/authentication/refresh-token"
  },

  USERS: {
    GET_MANY: '/users'
  },

  SESSIONS: {
    POST: "/sessions/create",
    GET_BY_ROOM: "/sessions/room",
    GET_BY_CREATOR: "/sessions/creator"
  }
}
