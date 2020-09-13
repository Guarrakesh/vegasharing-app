import React, { useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from "@react-native-community/async-storage";
import {useAPI} from "../shared/api/APIContext";
import {KEY_USER, KEY_USER_TOKEN} from "./api/login";

export const AuthContext = React.createContext({
  authenticated: false,
  user: {},
  token: {},

  onLoginSuccess: () => {}
});


export default function AuthContextProvider({ children }) {
  const [state, setState] = useState({
    authenticated: false,
    user: {},
    token: {},
    onLoginSuccess: () => {}
  });

  const { addRequestInterceptor, removeRequestInterceptor } = useAPI();

  /**
   * Aggiungi un interceptor per iniettare la token, se esiste, prima di ogni richiesta
   * @param request
   * @return {Promise<void>}
   */
  const addTokenInterceptor = useCallback(async (request) => {

    if (request.headers && request.headers.Authentication) {
      return request;
    } else {
      const userToken = state.token;
      if (userToken) {
        request.headers = {
          ...(request.headers ?? {}),
          Authentication: 'Bearer ' + userToken
        };
      }
      return request;
    }
  }, [state.token]);


  useEffect(() => {
    const interceptor = addRequestInterceptor(addTokenInterceptor);
        return () => removeRequestInterceptor(interceptor); //dispose
  }, []);


  const onLoginSuccess = async (user, token) => {
    await AsyncStorage.setItem(KEY_USER, JSON.stringify(user));
    await AsyncStorage.setItem(KEY_USER_TOKEN, JSON.stringify(token));
    setState({ ...state, authenticated: true, user, token });
  };

  const preloadValues = async () => {
    const token = await AsyncStorage.getItem(KEY_USER_TOKEN);
    const user = await AsyncStorage.getItem(KEY_USER);
    const newState = {};
    if (token) {
      newState.token = JSON.parse(token);
      newState.authenticated = true;
    };
    if (user) { newState.user = JSON.parse(user)};
    setState({ ...state, ...newState })
  }
  // Carica le info dallo storage
  useEffect( () => {
    preloadValues();
  }, []);

  return (
      <AuthContext.Provider value={{ onLoginSuccess, ...state}}>
        {children}
      </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext);

