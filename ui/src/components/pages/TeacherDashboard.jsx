import React from "react";
import TablePageCard from "../individual/TablePageCard";
import { useSelector } from "react-redux";
import { UsersActions } from "../../redux/reducers/Users";
import { Button } from "@mui/material";
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Content
// Edit
// Delete
// Archive
const columns = [
  {
    name: "id",
    label: "ID",
  },
  {
    name: "title",
    label: "Course Name",
  },
  {
    name: "students",
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
  const [editUserDialogOpen, setEditUserDialogOpen] = React.useState(false);
  const [userID, setUserID] = React.useState(null);
  // const Courses = useSelector((state) => state.Courses);
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
      id: course.ID,
      label: course.Label,
      title: "test",
      students: 9,
      actions: (
        <ButtonGroup variant="contained" size="meduium" aria-label="split button"
        onClick={() => {
          setEditUserDialogOpen(true);
          setUserID(user.ID);
        }}
      >
        Edit
          <Button>
          Class Content
        </Button>
        <ArrowDropDownIcon/>
        </ButtonGroup>
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
        <TablePageCard
          title={"Teacher Dashboard"}
          table={{ columns, data, options }}
        />
      )}
    </>
  );
};

export default TeacherDashboard;
