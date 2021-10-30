import React from "react";
import TablePageCard from "../individual/TablePageCard";
import { useSelector } from "react-redux";
import { UsersActions } from "../../redux/reducers/Users";
import { Button } from "@mui/material";

const columns = [
  {
    name: "id",
    label: "course ID",
  },
  {
    name: "course",
    label: "Course Name",
  },
  {
    name: "title",
    label: "Title",
  },
  {
    name: "description",
    label: "Description",
  },
  //{
    //name: "userID",
    //label: "User ID",
  //},
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
  const [editUserDialogOpen, setEditUserDialogOpen] = React.useState(false);
  const [userID, setUserID] = React.useState(null);
  // const Courses = useSelector((state) => state.Courses);
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
      id: course.ID,
      label: course.Label,
      title: course.Title,
      description: course.Description,
      userID: course.CreatedByUserID,
      actions: <Button>Class Content</Button>,
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
        <TablePageCard title={"Users"} table={{ columns, data, options }} />
      )}
    </>
  );
};

export default TeacherDashboard;
