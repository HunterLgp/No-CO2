import { fork } from "redux-saga/effects";
import { FormAuth } from "../../reducer/slices/auth/type";

function* handleLogin() {}
function* handleRegister() {}
function* handleLogout() {}
function* watchFlowAuth() {}

export function* auth() {
  yield fork(watchFlowAuth);
}
