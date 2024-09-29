import { CHANGE_PSWRD, PASSWORD_SUCCESS } from "./actionTypes"

export const changePassword = (pswrd) => {
    return {
      type: CHANGE_PSWRD,
      payload:{pswrd}
    }
  }

  