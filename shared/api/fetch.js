import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


const serverHost = 'http://localhost:3000';

export async function fetchAPI(endpoint, method, options)
{

  const userToken = await AsyncStorage.getItem("USER_TOKEN");
  let headers = {};
  // se esiste, la aggiungo agli header di richiesta per l'autenticazione
  if (userToken) {
    headers.Authentication = 'Bearer ' + JSON.parse(userToken).accessToken;
  }
  switch (method.toLowerCase()) {
    case 'get': {
      return await axios.get(serverHost + endpoint, {
        headers: headers
      })
    }
    case 'post': {
      return await axios.post(serverHost + endpoint, options.data, {
        headers: headers
      })
    }
    default:
      throw new Error("Metodo non supportato.");
  }
}

/**
 * Effettua una richiesta GET
 * @param endpoint
 * @param params parametri query da passare all'endpointì
 * @param options
 * @return {Promise<*>}
 */
export async function get(endpoint, params = {}, options)
{
  try {

    const response = await fetchAPI(buildEndpoint(endpoint, params), 'GET', options);
    return response.data;
  } catch (exception) {
    throw exception;
  }
}


/**
 * Costruire endpoint con eventuali parametri
 * @param endpoint
 * @param params
 * @return {*}
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
