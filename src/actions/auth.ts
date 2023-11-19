import { LOGIN_REQUEST, LOGIN_SUCCESS } from '@/constants'

export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  }
}

// @ts-ignore
export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload: payload,
})
