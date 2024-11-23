import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: localStorage.getItem("userAccount")
      ? JSON.parse(localStorage.getItem("userAccount"))
      : null,
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    resetUserInfo(state, action) {
      state.userInfo = null;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

// export default { userActions, userReducer };
