import { all } from "redux-saga/effects";
import { auth } from "./auth/authSaga";

export default function* rootSaga() {
  yield all([auth()]);
}

