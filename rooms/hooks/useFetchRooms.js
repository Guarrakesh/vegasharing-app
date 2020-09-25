import React from 'react';
import {createUseFetch} from "../../shared/api/useFetch";
import endpoints from "../../shared/endpoints";

export const useFetchRooms = () => {

  return createUseFetch(endpoints.ROOMS.GET_MANY, (user) => ({ userId: user._id || user.id }));
};

