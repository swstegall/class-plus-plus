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

const usersSlice = createSlice({
  name: "users",
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

const { cycle, reset } = usersSlice.actions;

export const Cycle = (token) => async (dispatch) => {
  dispatch(AppActions.SetLoading(true));
  try {
    const response = await axios({
      method: "get",
      url: `${C.localUrl}users`,
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

export const AdminUpdate = (token, userObject) => async (dispatch) => {
  dispatch(AppActions.SetLoading(true));
  try {
    const response = await axios({
      method: "put",
      url: `${C.localUrl}users`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: {
        ...userObject,
      },
    });
    dispatch(cycle(response.data));
    dispatch(
      NotificationActions.Open({
        Message: "User has been updated successfully.",
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

const Reset = () => async (dispatch) => {
  dispatch(reset());
};

export const UsersActions = {
  AdminUpdate,
  Cycle,
  Reset,
};

export default usersSlice.reducer;
