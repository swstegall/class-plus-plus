import * as React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TablePageCard from "../../individual/TablePageCard";
import ActionsButton from "./ActionsButton";

const columns = [
  {
    name: "courseName",
    label: "Name",
  },
  {
    name: "instructor",
    label: "Grade",
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
  const history = useHistory();
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
      instructor: course.Description,
      actions: (
        <ActionsButton
          sendToViewAssignment={() => history.push("/view_assignment")}
          sendToSubmitAssignment={() => history.push("/submit_assignment")}
        />
      ),
    };
  });

  return (
    <>
      {render && (
        <TablePageCard
          title={"Course Title"}
          table={{ columns, data, options }}
          button={{
            isRendered: false,
          }}
        />
      )}
    </>
  );
};

export default StudentCourseHome;
