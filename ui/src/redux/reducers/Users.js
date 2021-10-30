import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import C from "../../utilities/constants";
import { AppActions } from "./App";
import { NotificationActions } from "./Notification";
import { UserActions } from "./User";
import * as _ from "lodash";

const initialState = {
  Loaded: false,
  Active: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    cycle: (state, action) => {
      state.Active = _.orderBy([...action.payload], ["username"], "asc");
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
    dispatch(cycle(response.data.users));
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

export const Ban = (id, token) => async (dispatch) => {
  try {
    await axios({
      method: "post",
      url: `${C.localUrl}banUser`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: {
        id,
      },
    });
    dispatch(
      NotificationActions.Open({
        Message: "User banned successfully.",
        Severity: "success",
      })
    );
  } catch (error) {
    dispatch(
      NotificationActions.Open({
        Message: "Error banning user.",
        Severity: "error",
      })
    );
  }
};

export const Unban = (id, token) => async (dispatch) => {
  try {
    await axios({
      method: "post",
      url: `${C.localUrl}unbanUser`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: {
        id,
      },
    });
    dispatch(
      NotificationActions.Open({
        Message: "User unbanned successfully.",
        Severity: "success",
      })
    );
  } catch (error) {
    dispatch(
      NotificationActions.Open({
        Message: "Error unbanning user.",
        Severity: "error",
      })
    );
  }
};

const Reset = () => async (dispatch) => {
  dispatch(reset());
};

export const UsersActions = {
  Cycle,
  Ban,
  Unban,
  Reset,
};

export default usersSlice.reducer;
