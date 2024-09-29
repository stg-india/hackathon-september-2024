import { GET_ORG_PROFILE,GET_PROFILE,PROFILE_ERROR, PROFILE_SUCCESS, EDIT_PROFILE, RESET_PROFILE_FLAG, GET_COUNTRIES, SET_EMAIL_PREFERNCES } from "./actionTypes"

export const getProfile = () => {
  return {
    type: GET_PROFILE,
  }
}
export const getCountries = () => {
  return {
    type: GET_COUNTRIES,
  }
}

export const getorgProfile = () => {
  return {
    type: GET_ORG_PROFILE,
  }
}


export const emailpreference = data => {
  return {
    type: SET_EMAIL_PREFERNCES,
    payload: {data},
  }
}
export const editProfile = user => {
  return {
    type: EDIT_PROFILE,
    payload: { user },
  }
}
export const profileSuccess = msg => {
  return {
    type: PROFILE_SUCCESS,
    payload: msg,
  }
}

export const profileError = error => {
  return {
    type: PROFILE_ERROR,
    payload: error,
  }
}

export const resetProfileFlag = error => {
  return {
    type: RESET_PROFILE_FLAG,
  }
}
