import React, { useContext, useRef, useEffect, useState, useCallback } from 'react';
import AsyncStorage from "@react-native-community/async-storage";
import {useAPI} from "../shared/api/APIContext";
import {KEY_USER, KEY_USER_TOKEN} from "./api/login";
import {refreshToken} from "./api/refreshToken";

export const AuthContext = React.createContext({
  authenticated: true,
  user: {},
  token: {},

  onLoginSuccess: () => {}
});


const checkTokenExpired = (token) => {
  const expires = new Date(token.expiresIn);
  return (new Date() > expires);
};

export default function AuthContextProvider({ children }) {
  const [state, setState] = useState({
    authenticated: true,
    user: {},
    token: {},
  });

  const { addRequestInterceptor, removeRequestInterceptor } = useAPI();

  const tokenRef = useRef(null);
  const userRef = useRef(null);
  const isRefreshing = useRef(false);

  // Setta il ref appena cambia lo stato
  useEffect(() => {
    tokenRef.current = state.token;
    userRef.current = state.user;
  }, [state.token, state.user]);


  // Si mette in attesa finché non è stato fatto il refresh della token
  // Risolve la promise appena la token è stata refreshata, oppure reject (throw) se si verifica
  // un timeout
  const waitForRefresh = async () => {
    return new Promise((resolve, reject) => {

      // Se non c'è alcun refreshing in atto, risolvi subito
      if (!isRefreshing.current) return resolve();

      const nAttempts = 5;
      let attempts = 0;
      const interval = setInterval(() => {
        console.log("[] ... ");
        if (attempts === nAttempts) { // raggiunto il num max di tentativi
          clearInterval(interval);
          reject("Timeout waiting refresh token");
        }
        if (!isRefreshing.current) { // refreshing finito, risolvi
          clearInterval(interval);
          resolve();
        }
        attempts++;
      }, 500);
    })
  }
  /**
   * Aggiungi un interceptor per iniettare la token, se esiste, prima di ogni richiesta
   * @param request
   * @return {Promise<void>}
   */
  const addTokenInterceptor = async (request) => {
      if (request.headers && request.headers.Authorization) {
        return request;
      } else {

        if (tokenRef.current) {
          console.log("[AuthContext] Check if there is refresh token...");
          await waitForRefresh();
          if (checkTokenExpired(tokenRef.current)) {
            console.log("[AuthContext] Token expired. Refreshing ...");
            await callRefreshToken();
          }
          request.headers = {
            ...(request.headers ?? {}),
            Authorization: 'Bearer ' + tokenRef.current.accessToken
          };
        }


        return request;
      }
    };

  const callRefreshToken = async () => {
    isRefreshing.current = true;
    try {
      const response = await refreshToken(tokenRef.current.refreshToken);
      console.log("[AuthContext] Refresh done: " + response.data, response);
      await onLoginSuccess(userRef.current, response.data);
    } catch (ex) {
      console.log("[AuthContext] Refresh failed, logging out.");
      setState({ ...state, authenticated: false, token: null });
    } finally {
      isRefreshing.current = false;
    }
  };

  useEffect(() => {
    let interceptor;
    console.log("[AuthContext] Init...");
    const init = async () => {
      await preloadValues();
      interceptor = addRequestInterceptor(addTokenInterceptor);
    }
    init();
    return () => {
      console.log("[AuthContext] Unmounting...");
      removeRequestInterceptor(interceptor);
    } //dispose
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
      if (checkTokenExpired(token)) {
        newState.authenticated = false;
        newState.token = null;
        await AsyncStorage.remove(KEY_USER_TOKEN);
      }  else {
        newState.authenticated = true;
        newState.token = JSON.parse(token);
      }
    };
    if (user) { newState.user = JSON.parse(user)};
    setState({ ...state, ...newState })
  }


  return (
      <AuthContext.Provider value={{ onLoginSuccess, ...state}}>
        {children}
      </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext);

