import React from "react";
import TablePageCard from "../../individual/TablePageCard";
import { useSelector } from "react-redux";
import { UsersActions } from "../../../redux/reducers/Users";
import ActionsButton from "./ActionsButton";

const columns = [
  {
    name: "courseName",
    label: "Course Name",
  },
  {
    name: "numStudents",
    label: "Students",
  },
  {
    name: "actions",
    label: "Action",
    options: {
      filter: false,
      sort: false,
      download: false,
      print: false,
    },
  },
];

const options = {
  filterType: "multiselect",
  selectableRowsHeader: false,
  selectableRowsHideCheckboxes: true,
};

const TeacherDashboard = (props) => {
  const Courses = {
    Loaded: true,
    Active: [
      {
        ID: "test",
        CourseName: "test",
        Title: "test",
        Description: "test",
      },
      {
        ID: "test",
        CourseName: "test",
        Title: "test",
        Description: "test",
      },
      {
        ID: "test",
        CourseName: "test",
        Title: "test",
        Description: "test",
      },
      {
        ID: "test",
        CourseName: "test",
        Title: "test",
        Description: "test",
      },
      {
        ID: "test",
        CourseName: "test",
        Title: "test",
        Description: "test",
      },
    ],
  };
  const User = useSelector((state) => state.User);
  const render = User.Loaded && Courses.Loaded;

  const data = Courses.Active.map((course) => {
    return {
      courseName: course.CourseName,
      numStudents: 9,
      actions: (
        <ActionsButton
          sendToCourseHome={() => console.log("sendToCourseHome stub.")}
          spawnEditCourseDialog={() =>
            console.log("spawnEditCourseDialog stub.")
          }
        />
      ),
    };
  });

  React.useEffect(() => {
    if (User.Loaded && !Courses.Loaded) {
      props.dispatch(UsersActions.Cycle(User.Token));
    }
  }, [User, Courses.Loaded, props]);

  return (
    <>
      {render && (
        <TablePageCard title={"Courses"} table={{ columns, data, options }} />
      )}
    </>
  );
};

export default TeacherDashboard;
