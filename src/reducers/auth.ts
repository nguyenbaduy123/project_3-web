import { LOGIN_REQUEST, LOGIN_SUCCESS } from '@/constants'
import { createReducer } from '@reduxjs/toolkit'
import { JwtPayload, jwtDecode } from 'jwt-decode'

interface AuthState {
  userId: null | string
  userName: null | string
  accessToken: null | string
  locale: null | string
  group: null | string
}

interface ClaimsFromToken extends JwtPayload {
  user_id: string
  user_name: string
}

const initialState: AuthState = {
  userId: null,
  userName: null,
  accessToken: null,
  locale: null,
  group: null,
}

export default createReducer(initialState, {
  [LOGIN_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      fetching: true,
    })
  },
  [LOGIN_SUCCESS]: (state, payload) => {
    const accessToken = payload.access_token
    try {
      const claims: ClaimsFromToken = jwtDecode(accessToken)
      return Object.assign({}, state, {
        accessToken: accessToken,
        userName: claims.user_name,
        useId: claims.user_id,
      })
    } catch (e) {
      return state
    }
  },
})
