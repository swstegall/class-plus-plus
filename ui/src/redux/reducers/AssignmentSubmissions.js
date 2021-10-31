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

const assignmentSubmissionsSlice = createSlice({
  name: "assignmentSubmissions",
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

const { cycle, reset } = assignmentSubmissionsSlice.actions;

const Reset = () => async (dispatch) => {
  dispatch(reset());
};

const Cycle = (token) => async (dispatch) => {
  dispatch(AppActions.SetLoading(true));
  try {
    const response = await axios({
      method: "get",
      url: `${C.localUrl}assignments/readSubmissions`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    dispatch(cycle(response.data));
  } catch (error) {
    localStorage.clear();
    dispatch(UserActions.Reset());
    dispatch(
      NotificationActions.Open({
        Message: "Session invalid. Login again.",
        Severity: "error",
      })
    );
  }
  dispatch(AppActions.SetLoading(false));
};

export const AssignmentSubmissionsActions = {
  Cycle,
  Reset,
};

export default assignmentSubmissionsSlice.reducer;
