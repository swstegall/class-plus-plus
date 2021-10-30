import { combineReducers } from "redux";
import App from "./App";
import Notification from "./Notification";
import User from "./User";
import Users from "./Users";

export default combineReducers({
  App,
  Notification,
  User,
  Users,
});
