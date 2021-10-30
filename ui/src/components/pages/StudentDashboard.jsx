import React from "react";
import TablePageCard from "../individual/TablePageCard";
import { useSelector } from "react-redux";
import { UsersActions } from "../../redux/reducers/Users";
import Button from '@mui/material/Button';


const columns = [
  {
    name: "id",
    label: "Course ID",
  },
  {
    name: "label",
    label: "Course Name",
  },
  {
    name: "description",
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
};
const StudentDashboard = (props) => {
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
      description: course.Description,
      actions: <Button variant="contained">Course Home</Button>,
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
export default StudentDashboard;
