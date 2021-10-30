import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import C from "../../utilities/constants";
import { NotificationActions } from "./Notification";
import { UsersActions } from "./Users";
import { AppActions } from "./App";

const initialState = {
  Loaded: false,
  Email: null,
  FirstName: null,
  Grade: null,
  LastName: null,
  RoleID: null,
  UserID: null,
  Token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initialize: (state, action) => {
      state.Email = action.payload.Email;
      state.FirstName = action.payload.FirstName;
      state.Grade = action.payload.Grade;
      state.LastName = action.payload.LastName;
      state.RoleID = action.payload.RoleID;
      state.UserID = action.payload.UserID;
      state.Token = action.payload.Token;
      state.Loaded = true;
    },
    reset: (state) => {
      state.Email = null;
      state.FirstName = null;
      state.Grade = null;
      state.LastName = null;
      state.RoleID = null;
      state.UserID = null;
      state.Token = null;
      state.Loaded = false;
    },
  },
});

const { initialize, reset } = userSlice.actions;

const Initialize =
  (email, firstName, grade, lastName, roleID, userID, token) =>
  async (dispatch) => {
    dispatch(
      initialize({
        Email: email,
        FirstName: firstName,
        Grade: grade,
        LastName: lastName,
        RoleID: roleID,
        UserID: userID,
        Token: token,
      })
    );
    dispatch(UsersActions.Cycle(token));
  };

const Login = (email, password) => async (dispatch) => {
  dispatch(AppActions.SetLoading(true));
  try {
    const response = await axios({
      method: "post",
      url: `${C.localUrl}login`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        Email: email,
        Password: password,
      },
    });
    dispatch(
      initialize({
        Email: response.data.Email,
        FirstName: response.data.FirstName,
        Grade: response.data.Grade,
        LastName: response.data.LastName,
        RoleID: response.data.RoleID,
        UserID: response.data.UserID,
        Token: response.data.Token,
      })
    );
    localStorage.setItem("Email", response.data.Email);
    localStorage.setItem("FirstName", response.data.FirstName);
    localStorage.setItem("Grade", response.data.Grade);
    localStorage.setItem("LastName", response.data.LastName);
    localStorage.setItem("RoleID", response.data.RoleID);
    localStorage.setItem("UserID", response.data.UserID);
    localStorage.setItem("Token", response.data.token);
    // dispatch(UsersActions.Cycle(response.data.token));
  } catch (error) {
    dispatch(
      NotificationActions.Open({
        Message: "Invalid email or password, or user does not exist.",
        Severity: "error",
      })
    );
  }
  dispatch(AppActions.SetLoading(false));
};

const Register =
  (email, password, firstName, lastName, grade, role) => async (dispatch) => {
    dispatch(AppActions.SetLoading(true));
    try {
      await axios({
        method: "post",
        url: `${C.localUrl}users/create`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          Email: email,
          Password: password,
          FirstName: firstName,
          LastName: lastName,
          Grade: grade,
          RoleID: role,
        },
      });
      dispatch(
        NotificationActions.Open({
          Message: "User has been created successfully.",
          Severity: "success",
        })
      );
    } catch (error) {
      dispatch(
        NotificationActions.Open({
          Message: "Error creating user.",
          Severity: "error",
        })
      );
    }
    dispatch(AppActions.SetLoading(false));
  };

const ChangePassword = (password, token) => async (dispatch) => {
  try {
    await axios({
      method: "post",
      url: `${C.localUrl}changePassword`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: {
        password,
      },
    });
    localStorage.clear();
    dispatch(reset());
    dispatch(
      NotificationActions.Open({
        Message: "Password has been changed successfully.",
        Severity: "success",
      })
    );
  } catch (error) {
    dispatch(
      NotificationActions.Open({
        Message: "Error changing password.",
        Severity: "error",
      })
    );
  }
};

const Reset = () => async (dispatch) => dispatch(reset());

export const UserActions = {
  Initialize,
  Login,
  Register,
  Reset,
  ChangePassword,
};

export default userSlice.reducer;
