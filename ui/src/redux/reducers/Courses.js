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

const coursesSlice = createSlice({
  name: "courses",
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

const { cycle, reset } = coursesSlice.actions;

const Reset = () => async (dispatch) => {
  dispatch(reset());
};

const Cycle = (token) => async (dispatch) => {
  dispatch(AppActions.SetLoading(true));
  try {
    const response = await axios({
      method: "get",
      url: `${C.localUrl}courses`,
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

const StudentRegister = (token, courseID) => async (dispatch) => {
  dispatch(AppActions.SetLoading(true));
  try {
    const response = await axios({
      method: "post",
      url: `${C.localUrl}courses/register`,
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
    dispatch(
      NotificationActions.Open({
        Message: "Registration successful.",
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

const TeacherCreate = (token, courseObject) => async (dispatch) => {
  dispatch(AppActions.SetLoading(true));
  try {
    const response = await axios({
      method: "post",
      url: `${C.localUrl}courses`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: {
        ...courseObject,
      },
    });
    dispatch(cycle(response.data));
    dispatch(
      NotificationActions.Open({
        Message: "Course has been created successfully.",
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

const TeacherUpdate = (token, courseObject) => async (dispatch) => {
  dispatch(AppActions.SetLoading(true));
  try {
    const response = await axios({
      method: "put",
      url: `${C.localUrl}courses`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: {
        ...courseObject,
      },
    });
    dispatch(cycle(response.data));
    dispatch(
      NotificationActions.Open({
        Message: "Course has been updated successfully.",
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

export const CoursesActions = {
  Cycle,
  Reset,
  StudentRegister,
  TeacherCreate,
  TeacherUpdate,
};

export default coursesSlice.reducer;
