import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/userReducer";
import matchReducer from "./reducers/matchUpdate";

const userInfoLocalStorage = localStorage.getItem("userAccount")
  ? JSON.parse(localStorage.getItem("userAccount"))
  : null;

console.log(userInfoLocalStorage, "localstorage");

const initialState = { userInfo: userInfoLocalStorage };
const store = configureStore({
  reducer: {
    user: userReducer,
    match: matchReducer,
  },
  preloadedState: initialState,
});

export default store;
