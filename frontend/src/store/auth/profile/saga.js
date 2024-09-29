import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { COUNTRIES_LIST, EDIT_PROFILE, GET_COUNTRIES, ORG_PROFILE_DATA, PROFILE_DATA, SET_EMAIL_PREFERNCES } from "./actionTypes";
import { GET_ORG_PROFILE,GET_PROFILE } from "./actionTypes";
import {getProfile, profileSuccess, profileError } from "./actions";
//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  get_Profile,
  postProfile,
  postJwtProfile,
  get_Orgprofile,
  get_Countries,
  save_user_email_preferences,
} from "../../../helpers/fakebackend_helper";
import axios from "axios";


const fireBaseBackend = getFirebaseBackend();


function* save_preferences({payload:{data}}){
  try{
    let response=yield call(save_user_email_preferences,data)
    console.log(response,"preference ka")
  }
  catch(err){
    console.log(err)
  }
}

function* get_countries(){
  try{
    
    let response=yield call(get_Countries)
    // let response=yield call(axios.get,'http://localhost:8000/customer/get_customer/')
    console.log(response,"countries")
    // console.log("Profile Profile")
    // sessionStorage.setItem("orgProfile", JSON.stringify(response));
    yield put({type:COUNTRIES_LIST,data:response})
    

  }
  catch(err){
    console.log(err)
  }
}
function* get_ORG_profile(){
  try{
    
    let response=yield call(get_Orgprofile)
    // let response=yield call(axios.get,'http://localhost:8000/customer/get_customer/')
    console.log(response,"orgprofile ka")
    // console.log("Profile Profile")
    // sessionStorage.setItem("orgProfile", JSON.stringify(response));
    yield put({type:ORG_PROFILE_DATA,data:response})
    

  }
  catch(err){
    console.log(err)
  }
}
function* getprofile(){
  try{
    
    let response=yield call(get_Profile)
    // let response=yield call(axios.get,'http://localhost:8000/common/get_profile/')
    console.log(response,"profile ka")
    // console.log("Profile Profile")
    // sessionStorage.setItem("UserProfile", JSON.stringify(response));
    yield put({type:PROFILE_DATA,data:response})
    

  }
  catch(err){
    console.log(err)
  }
}

function* editProfile({ payload: { user } }) {

  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.editProfileAPI,
        user.username,
        user.idx
      );
      yield put(profileSuccess(response));
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtProfile, "/post-jwt-profile", {
        username: user.username,
        idx: user.idx,
      });
      yield put(profileSuccess(response));
    } else if (process.env.REACT_APP_API_URL) {
      const response = yield call(postProfile,user);
      yield put(profileSuccess(response));
    }
  } catch (error) {
    yield put(profileError(error));
  }
}


export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile);
  yield takeEvery(GET_PROFILE, getprofile);
  yield takeEvery(GET_ORG_PROFILE, get_ORG_profile);
  yield takeEvery(GET_COUNTRIES, get_countries);
  yield takeEvery(SET_EMAIL_PREFERNCES, save_preferences);

  
}

function* ProfileSaga() {
  yield all([fork(watchProfile)]);
}

export default ProfileSaga;
