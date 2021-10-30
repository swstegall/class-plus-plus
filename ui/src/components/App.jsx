import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useEffectOnce } from "react-use";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import { NotificationActions } from "../redux/reducers/Notification";
import { LinearProgress } from "@mui/material";
import { UserActions } from "../redux/reducers/User";
import CreateUser from "./pages/CreateUser";
import CustomAppBar from "./individual/CustomAppBar";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentCourseHome from "./pages/StudentCourseHome";
import StudentSubmitAssignment from "./pages/StudentSubmitAssignment";
import StudentViewAssignment from "./pages/StudentViewAssignment";
import TeacherCourseHome from "./pages/TeacherCourseHome";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App = () => {
  const dispatch = useDispatch();
  const Loading = useSelector((state) => state.App.Loading);
  const Notification = useSelector((state) => state.Notification);
  const User = useSelector((state) => state.User);
  const loggedIn = User.Email !== null && User.Token !== null;

  useEffectOnce(() => {
    const roleID = Number(localStorage.getItem("RoleID"));
    const token = localStorage.getItem("Token");
    const userID = localStorage.getItem("UserID");
    const grade = localStorage.getItem("Grade");
    const email = localStorage.getItem("Email");
    const lastName = localStorage.getItem("LastName");
    const firstName = localStorage.getItem("FirstName");
    if (
      email !== null &&
      firstName !== null &&
      grade !== null &&
      lastName !== null &&
      roleID !== null &&
      userID !== null &&
      token !== null
    ) {
      dispatch(
        UserActions.Initialize(
          email,
          firstName,
          grade,
          lastName,
          roleID,
          userID,
          token
        )
      );
    } else {
      dispatch(UserActions.Reset());
    }
  });

  return (
    <>
      {!loggedIn && Loading && <LinearProgress />}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={Notification.Open}
        autoHideDuration={2000}
        onClose={() => dispatch(NotificationActions.SetOpen(false))}
      >
        <Alert
          onClose={() => dispatch(NotificationActions.SetOpen(false))}
          severity={Notification.Severity}
        >
          {Notification.Message}
        </Alert>
      </Snackbar>
      {loggedIn ? (
        User.RoleID === 2 ? (
          <>
            <CustomAppBar />
            <div className={"container-fluid"} style={{ width: "75vw" }}>
              <Switch>
                <Route key={"admin_dashboard"} path={"/admin_dashboard"}>
                  <AdminDashboard dispatch={dispatch} />
                </Route>
                <Redirect to={"/admin_dashboard"} />
              </Switch>
            </div>
          </>
        ) : User.RoleID === 1 ? (
          <>
            <CustomAppBar />
            <div className={"container-fluid"} style={{ width: "75vw" }}>
              <Switch>
                <Route key={"courses"} path={"/course_home"}>
                  <TeacherCourseHome dispatch={dispatch} />
                </Route>
                <Route key={"courses"} path={"/courses"}>
                  <TeacherDashboard dispatch={dispatch} />
                </Route>
                <Redirect to={"/courses"} />
              </Switch>
            </div>
          </>
        ) : (
          <>
            <CustomAppBar />
            <div className={"container-fluid"} style={{ width: "75vw" }}>
              <Switch>
                <Route key={"submit_assignment"} path={"/submit_assignment"}>
                  <StudentSubmitAssignment dispatch={dispatch} />
                </Route>
                <Route key={"view_assignment"} path={"/view_assignment"}>
                  <StudentViewAssignment dispatch={dispatch} />
                </Route>
                <Route key={"course_home"} path={"/course_home"}>
                  <StudentCourseHome dispatch={dispatch} />
                </Route>
                <Route key={"courses"} path={"/courses"}>
                  <StudentDashboard dispatch={dispatch} />
                </Route>
                <Redirect to={"/courses"} />
              </Switch>
            </div>
          </>
        )
      ) : (
        <Switch>
          <Route key={"login"} path={"/login"}>
            <Login dispatch={dispatch} />
          </Route>
          <Route key={"create_user"} path={"/create_user"}>
            <CreateUser dispatch={dispatch} />
          </Route>
          <Redirect to="/login" />
        </Switch>
      )}
    </>
  );
};

export default App;
