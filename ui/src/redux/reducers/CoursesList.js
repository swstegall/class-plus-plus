import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import C from "../../utilities/constants";
import { AppActions } from "./App";
import { NotificationActions } from "./Notification";
import { UserActions } from "./User";

const initialState = {
  Loaded: false,
  Active: [],
};

const coursesListSlice = createSlice({
  name: "coursesList",
  initialState,
  reducers: {
    cycle: (state, action) => {
      state.Active = action.payload;
      state.Loaded = true;
    },
    reset: (state) => {
      state.Active = [];
      state.Loaded = false;
    },
  },
});

const { cycle, reset } = coursesListSlice.actions;

const Cycle = () => async (dispatch) => {
  dispatch(reset());
};

const Reset = () => async (dispatch) => {
  dispatch(reset());
};

export const UsersActions = {
  Cycle,
  Reset,
};

export default coursesListSlice.reducer;
