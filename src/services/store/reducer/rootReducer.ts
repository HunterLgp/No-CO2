import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import auth from "./slices/auth/slice";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["token"],
};
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, auth),
});
export default rootReducer;
