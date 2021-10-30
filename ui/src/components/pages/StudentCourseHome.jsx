import * as React from "react";
import TablePageCard from "../individual/TablePageCard";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";

const columns = [
  {
    name: "courseName",
    label: "Name",
  },
  {
    name: "title",
    label: "Grade",
  },
  {
    name: "instructor",
    label: "Instructor",
  },
  {
    name: "actions",
    label: "Content",
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
  search: false,
  download: false,
  print: false,
  viewColumns: false,
  filter: false,
};

const StudentCourseHome = (props) => {
  return;
  const Courses = {
    Loaded: true,
    Active: [
      {
        ID: "test",
        Label: "test",
        Title: "test",
        Description: "test",
        CreatedByUserID: "test",
      },
      {
        ID: "test",
        Label: "test",
        Title: "test",
        Description: "test",
        CreatedByUserID: "test",
      },
      {
        ID: "test",
        Label: "test",
        Title: "test",
        Description: "test",
        CreatedByUserID: "test",
      },
      {
        ID: "test",
        Label: "test",
        Title: "test",
        Description: "test",
        CreatedByUserID: "test",
      },
      {
        ID: "test",
        Label: "test",
        Title: "test",
        Description: "test",
        CreatedByUserID: "test",
      },
    ],
  };
  const User = useSelector((state) => state.User);
  const render = User.Loaded && Courses.Loaded;

  const data = Courses.Active.map((course) => {
    return {
      courseName: course.Label,
      title: course.Title,
      instructor: course.Description,
      actions: <Button variant="contained">Home</Button>,
    };
  });

  return (
    <>
      {render && (
        <TablePageCard title={"Courses"} table={{ columns, data, options }} />
      )}
    </>
  );
};

export default StudentCourseHome;
