import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Loading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    set: (state, action) => {
      state.Loading = action.payload;
    },
  },
});

const { set } = appSlice.actions;

const SetLoading = (status) => async (dispatch) => {
  dispatch(set(status));
};

export const AppActions = {
  SetLoading,
};

export default appSlice.reducer;
