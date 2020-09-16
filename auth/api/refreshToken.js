import AsyncStorage from "@react-native-community/async-storage";
import {APIError} from "../../shared/api/APIError";
import {fetch, post} from "../../shared/api/fetch";
import endpoints from "../../shared/endpoints";


export class AuthError extends APIError {
  constructor(apiError, type) {
    super(apiError.message, apiError.request, apiError.response);
    this.type = type;
  }
}
export async function refreshToken(token) {
  try {
    const response =  await post(endpoints.AUTH.REFRESH_TOKEN, token );
    return response;
  } catch (error) {
    if (error instanceof APIError) {
      throw new AuthError(error, error.response.data.type)
    } else {
      throw error;
    }
  }
}
