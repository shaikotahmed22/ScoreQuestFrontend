import { userActions } from "./userReducer.js";

export const logout = () => (dispatch) => {
  dispatch(userActions.resetUserInfo());
  localStorage.removeItem("userAccount");
};
