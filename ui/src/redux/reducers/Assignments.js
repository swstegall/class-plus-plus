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

const assignmentsSlice = createSlice({
  name: "assignments",
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

const { cycle, reset } = assignmentsSlice.actions;

const Reset = () => async (dispatch) => {
  dispatch(reset());
};

const Create = (token, assignmentObject) => async (dispatch) => {
  dispatch(AppActions.SetLoading(true));
  try {
    const response = await axios({
      method: "post",
      url: `${C.localUrl}assignments`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: {
        ...assignmentObject,
      },
    });
    dispatch(cycle(response.data));
    dispatch(
      NotificationActions.Open({
        Message: "Assignment has been created successfully.",
        Severity: "success",
      })
    );
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

const Cycle = (token, courseID) => async (dispatch) => {
  dispatch(AppActions.SetLoading(true));
  try {
    const response = await axios({
      method: "post",
      url: `${C.localUrl}assignments/read`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: {
        CourseID: courseID,
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

const Update = (token, assignmentObject) => async (dispatch) => {
  dispatch(AppActions.SetLoading(true));
  try {
    const response = await axios({
      method: "put",
      url: `${C.localUrl}assignments`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: {
        ...assignmentObject,
      },
    });
    dispatch(cycle(response.data));
    dispatch(
      NotificationActions.Open({
        Message: "Assignment has been updated successfully.",
        Severity: "success",
      })
    );
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

export const AssignmentsActions = {
  Create,
  Cycle,
  Reset,
  Update,
};

export default assignmentsSlice.reducer;
