import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {KEY_USER_TOKEN} from "../../auth/api/login";
import {APIError} from "./APIError";


const serverHost = 'http://localhost:3000';

axios.interceptors.request.use(async function(request) {
  // se esiste, la aggiungo agli header di richiesta per l'autenticazione

  if (request.headers && request.headers.Authentication) {
    return request;
  } else {
    const userToken = await AsyncStorage.getItem(KEY_USER_TOKEN);
    if (userToken) {
      request.headers = {
        ...request.headers ?? {},
        Authentication: 'Bearer ' + JSON.parse(userToken).accessToken
      };
    }
    return request;
  }
});

/**
 * Generic fetch request
 * @param endpoint
 * @param method
 * @param options
 * @return {Promise<AxiosResponse<T>>}
 */
export async function fetchAPI(endpoint, method, options)
{
  try {
    switch (method.toLowerCase()) {
      case 'get': {
        return await axios.get(serverHost + endpoint)
      }
      case 'post': {
        return await axios.post(serverHost + endpoint, options.data)
      }
      default:
        throw new Error("Metodo non supportato.");
    }
  } catch (error) {
    throw new APIError(error.message, error.response.request, error.response);
  }
}

/**
 * Effettua una richiesta GET
 * @param endpoint
 * @param params parametri query da passare all'endpointì
 * @param options
 * @return {Promise<Response>}
 */
export async function get(endpoint, params = {}, options)
{
  const response = await fetchAPI(buildEndpoint(endpoint, params), 'GET', options);
    return response.data;

}

/**
 * Effettua una chiamata POST
 * @param endpoint
 * @param body
 * @param options
 * @return {Promise<Response>}
 */
export async function post(endpoint, body, options)
{

    const response = await fetchAPI(endpoint, 'POST', {
      data: body,
      ...options
    });
    return response.data;

}
/**
 * Costruire endpoint con eventuali parametri
 * @param endpoint
 * @param params
 * @return {Promise<Response>}
 */
function buildEndpoint(endpoint, params) {
  let url = endpoint;
  const keys = Object.keys(params);
  if (keys.length > 0) {
    url += "?";
    keys.forEach((key, i) => {
      url += key + "=" + params[key];
      if (i !== keys.length - 1) {
        url += "&";
      }
    });
  }
  return url;
}