import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["token", "refreshToken"],
};
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, auth),
});
export default rootReducer;

