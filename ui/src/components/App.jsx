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
    const roleID = localStorage.getItem("RoleID");
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
          `Bearer ${token}`
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
        <Switch>
          <Route key={"admin_dashboard"} path={"/admin_dashboard"}>
            <AdminDashboard dispatch={dispatch} />
          </Route>
          <Redirect to={"/admin_dashboard"} />
        </Switch>
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
