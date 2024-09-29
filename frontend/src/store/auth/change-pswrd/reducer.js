import { CHANGE_PSWRD, PASSWORD_ERROR, PASSWORD_SUCCESS } from "./actionTypes";

const initialState = {
    error: "",
    success: "",
  };
  
  const change_pswrd = (state = initialState, action) => {
    switch (action.type) {
      case PASSWORD_SUCCESS:
        state={
          ...state,
            success:action.msg
        };
        break;
      case PASSWORD_ERROR:
        state={
          ...state,
            error:action.msg
        };
        break;
        default:
            state = { ...state };
    }
    return state;
};

export default change_pswrd;
