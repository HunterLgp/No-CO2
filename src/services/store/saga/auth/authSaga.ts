import { call, fork, put, take, select } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  FormAuth,
  ResponseAuth,
  login,
  logout,
  loginSuccess,
  loginFailed,
  register,
  registerFailed,
  registerSuccess,
  logoutSuccess,
  logoutFailed,
} from "../../reducer/slices/authSlice";
import { loginAPI, logoutAPI, registerAPI } from "../../../apis/auth";
import { RootState } from "../../rootStore";

function* handleLoginOrRegister(action: PayloadAction<FormAuth>, authSuccess: { status: boolean }) {
  if (action.type === register.type) {
    try {
      // @ts-ignore
      const res = yield call(registerAPI, action.payload);
      if (res.status === 200) {
        yield put(registerSuccess(res.data));
      } else {
        yield put(registerFailed(res));
      }
    } catch (error) {
      yield put(registerFailed(error));
    }
  } else {
    try {
      // @ts-ignore
      const res = yield call(loginAPI, action.payload);
      if (res.status === 200) {
        authSuccess.status = true;
        yield put(loginSuccess(res.data));
      } else {
        yield put(loginFailed(res));
      }
    } catch (error) {
      yield put(loginFailed(error));
    }
  }
}
function* handleLogout(action: PayloadAction<ResponseAuth>, authSuccess: { status: boolean }) {
  //@ts-ignore
  const res = yield call(logoutAPI, action.payload);
  if (res.status === 200) {
    authSuccess.status = false;
    yield put(logoutSuccess());
  } else {
    yield put(logoutFailed(res));
  }
}
const getState = (state: RootState) => state.auth;
function* watchFlowAuth() {
  let authSuccess = { status: false };
  while (true) {
    //@ts-ignore
    const authState = yield select(getState);
    if (!authState._persist.token) {
      const action: PayloadAction<FormAuth> = yield take([register.type, login.type]);
      yield call(handleLoginOrRegister, action, authSuccess);
    } else {
      authSuccess.status = true;
    }
    if (authSuccess.status) {
      const action: PayloadAction<ResponseAuth> = yield take(logout.type);
      yield call(handleLogout, action, authSuccess);
    }
  }
}

export function* auth() {
  yield fork(watchFlowAuth);
}

