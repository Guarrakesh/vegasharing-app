import React, { useContext, useEffect, useState, useCallback } from 'react';
import {fetchAPI, post as postAPI, get as getAPI, addRequestInterceptor, removeRequestInterceptor} from "./fetch";
import axios from 'axios';

const initialValue = {
  data: {},
  axios: null,
  fetch: () => {},
  post: () => {},
  put: () => {},
  get: () => {},
  patch: () => {},
  delete: () => {},
  addRequestInterceptor: () => {},
  removeRequestInterceptor: () => {},
};

export const APIContext = React.createContext(initialValue);

export default function APIContextProvider({ children }) {

  const fetch = (...args) => fetchAPI(...args);
  const post = (...args) => postAPI(...args);
  const get = (...args) => getAPI(...args);

  const contextValue = {
    ...initialValue,
    fetch, post, get,
    data: {},
    addRequestInterceptor: (callback) => addRequestInterceptor(callback),
    removeRequestInterceptor: (interceptor) => removeRequestInterceptor(interceptor),

  };
  return (
      <APIContext.Provider value={contextValue}>
        {children}
      </APIContext.Provider>
  )
}
export const useAPI = () => useContext(APIContext);

