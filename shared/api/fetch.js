import axios from 'axios';

import {APIError} from "./APIError";


const serverHost = 'http://localhost:3000';

export const addRequestInterceptor = (callback => axios.interceptors.request.use(callback) );
export const removeRequestInterceptor = (interceptor) => axios.interceptors.request.eject(interceptor);
export const addResponseInterceptor = (callback) => axios.interceptors.response.use(callback);
export const removeResponseInterceptor = (interceptor) => axios.interceptors.response.eject(interceptor);



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
        const resp =  await axios.get(serverHost + endpoint);
      return resp;
      }
      case 'post': {
        return await axios.post(serverHost + endpoint, options.data)
      }
      default:
        throw new Error("Metodo non supportato.");
    }
  } catch (error) {
    if (error.request) {
      throw new APIError(error.message, error.response.request, error.response);
    }
    throw (error);
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
  try {

    return await fetchAPI(buildEndpoint(endpoint, params), 'GET', options);

  } catch (error) {
    if (error.request) {
      throw new APIError(error.message, error.response.request, error.response);
    }
  }
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
  return await fetchAPI(endpoint, 'POST', {
      data: body,
      ...options
    });

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
