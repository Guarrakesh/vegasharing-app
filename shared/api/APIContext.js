import React, { useContext, useEffect, useState, useCallback } from 'react';
import {fetchAPI, post as postAPI, get as getAPI, addRequestInterceptor, removeRequestInterceptor} from "./fetch";
import axios from 'axios';

const initialValue = {
  data: {},
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

  const fetch = async (...args) => fetchAPI(...args);
  const post = async (...args) => postAPI(...args);
  const get = async (...args) => getAPI(...args);

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

