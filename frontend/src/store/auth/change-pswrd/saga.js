import { all, call, fork, put, takeEvery } from "redux-saga/effects"
import { Change_password } from "../../../helpers/fakebackend_helper"
import { CHANGE_PSWRD, PASSWORD_ERROR, PASSWORD_SUCCESS } from "./actionTypes"

function* chng_password(password){
    try{
      
      let response=yield call(Change_password,password)
      // let response=yield call(axios.get,'http://localhost:8000/customer/get_customer/')
      console.log(response,"paswrd change")
      // console.log("Profile Profile")
      // sessionStorage.setItem("orgProfile", JSON.stringify(response));
      yield put({type:PASSWORD_SUCCESS,msg:response})
      
  
    }
    catch(err){
      console.log(err)
      yield put({type:PASSWORD_ERROR,msg:err})
    }
  }

  export function* checkpassword() {
    yield takeEvery(CHANGE_PSWRD,chng_password);
    
  
    
  }
  
  function* PasswordSaga() {
    yield all([fork(checkpassword)]);
  }
  
  export default PasswordSaga;
  