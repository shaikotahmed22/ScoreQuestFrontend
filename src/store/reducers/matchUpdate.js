import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  match: null,
};
export const matchSlice = createSlice({
  name: "matchUpdate",
  initialState,
  reducers: {
    setMatch(state, action) {
      state.match = action.payload;
    },
  },
});

export const matchActions = matchSlice.actions;
export default matchSlice.reducer;

// export default { userActions, userReducer };
