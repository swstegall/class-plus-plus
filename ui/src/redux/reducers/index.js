import { combineReducers } from "redux";
import App from "./App";
import Assignments from "./Assignments";
import AssignmentSubmissions from"./AssignmentSubmissions";
import Courses from "./Courses";
import CourseRegistrations from "./CourseRegistrations";
import CoursesList from "./CoursesList";
import Notification from "./Notification";
import Teachers from "./Teachers";
import User from "./User";
import Users from "./Users";

export default combineReducers({
  App,
  Assignments,
  AssignmentSubmissions,
  Courses,
  CourseRegistrations,
  CoursesList,
  Notification,
  Teachers,
  User,
  Users,
});
