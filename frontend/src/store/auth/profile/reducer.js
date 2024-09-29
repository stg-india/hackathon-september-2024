import { GET_PROFILE,PROFILE_ERROR, PROFILE_SUCCESS, EDIT_PROFILE, RESET_PROFILE_FLAG, PROFILE_DATA, ORG_PROFILE_DATA, COUNTRIES_LIST } from "./actionTypes";

const initialState = {
  error: "",
  success: "",
  user: {},
  org_user:{},
  country_list:{},
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      state={
        ...state,
      user:action.payload
      };
      break;
    case COUNTRIES_LIST:
      state={
        ...state,
        success:null,
      country_list:action.data.country_list
      };
      break;
    case PROFILE_DATA:
      state={
        ...state,
        success:null,
      user:action.data
      };
      break;
    case ORG_PROFILE_DATA:
      state={
        ...state,
        success:null,
      org_user:action.data
      };
      break;
    case EDIT_PROFILE:
      state = { ...state };
      break;
    case PROFILE_SUCCESS:
      state = {
        ...state,
        success: action.payload.message,
        // user: action.payload
      };
      break;
    case PROFILE_ERROR:
      state = {
        ...state,
        error: action.payload
      };
      break;
    case RESET_PROFILE_FLAG:
      state = {
        ...state,
        success: null
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default profile;
