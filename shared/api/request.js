import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


const serverHost = 'http://localhost:3000';

export async function request(endpoint, method, options)
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

