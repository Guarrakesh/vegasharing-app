import AsyncStorage from "@react-native-community/async-storage";
import {APIError} from "../../shared/api/APIError";
import {fetch, post} from "../../shared/api/fetch";
import endpoints from "../../shared/endpoints";

export const KEY_USER_TOKEN = 'KEY_USER_TOKEN';
export const KEY_USER = 'KEY_USER';

export const AuthErrorTypes = [
      "NOT_FOUND",
      "INVALID_CREDENTIALS",
      "UNKNOWN",
      "REFRESH_TOKEN_NOT_FOUND",
      "REFRESH_TOKEN_EXPIRED",
      "EMAIL_ALREADY_TAKEN",
];


export class AuthError extends APIError {
  constructor(apiError, type) {
    super(apiError.message, apiError.request, apiError.response);
    this.type = type;
  }
}
export async function login(email, password) {
  try {
    const body = { email, password };
    const response =  await post(endpoints.AUTH.LOGIN, body );
    return response;
  } catch (error) {
    if (error instanceof APIError) {
      throw new AuthError(error, error.response.data.type)
    } else {
      throw error;
    }
  }
}
