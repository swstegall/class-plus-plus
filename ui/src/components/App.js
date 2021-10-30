import { Redirect, Route, Switch } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <Switch>
        <Route key={"login"} path={"/admin_dashboard"}>
          <AdminDashboard />
        </Route>
        <Route key={"login"} path={"/login"}>
          <Login />
        </Route>
        <Redirect to="/login" />
      </Switch>
    </>
  );
};

export default App;
