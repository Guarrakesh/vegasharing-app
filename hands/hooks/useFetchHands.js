import React from 'react';
import {createUseFetch} from "../../shared/api/useFetch";
import endpoints from "../../shared/endpoints";

export const useFetchHands = () => {

  return createUseFetch(endpoints.SESSIONS.GET_BY_CREATOR, (user) => ({ creatorId: user._id || user.id }));
};

