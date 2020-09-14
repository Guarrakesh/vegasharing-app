export default {
  ROOMS: {
    GET_MANY: "/rooms",
    GETBYUSERID: "/rooms?userId=:userId", // questa andrà eliminata una volta che /rooms/:userId diventerà /rooms?userId=:userId
    GET_ONE: "/rooms/:id",
    POST: "/rooms",
    DELETE: "/rooms",
  },

  AUTH: {
    LOGIN: "/authentication/login",
    REGISTER: "/authentication/register"
  }
}
