import React from "react";
import TablePageCard from "../../individual/TablePageCard";
import { useSelector } from "react-redux";
import { UsersActions } from "../../../redux/reducers/Users";
import EditUserDialog from "./EditUserDialog";
import Button from "@mui/material/Button";

const grades = {
  K: "Kindergarten",
  1: "1st Grade",
  2: "2nd Grade",
  3: "3rd Grade",
  4: "4th Grade",
  5: "5th Grade",
  6: "6th Grade",
  7: "7th Grade",
  8: "8th Grade",
  9: "9th Grade",
  10: "10th Grade",
  11: "11th Grade",
  12: "12th Grade",
};

const columns = [
  {
    name: "id",
    label: "ID",
  },
  {
    name: "name",
    label: "Name",
  },
  {
    name: "email",
    label: "E-Mail",
  },
  {
    name: "grade",
    label: "Grade",
  },
  {
    name: "role",
    label: "Role",
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

const AdminDashboard = (props) => {
  const [editUserDialogOpen, setEditUserDialogOpen] = React.useState(false);
  const [userID, setUserID] = React.useState(null);
  const Users = useSelector((state) => state.Users);
  const User = useSelector((state) => state.User);
  const render = User.Loaded && Users.Loaded;

  const data = Users.Active.map((user) => {
    return {
      id: user.ID,
      name: `${user.user.FirstName} ${user.user.LastName}`,
      email: user.Email,
      grade: grades[user.user.Grade],
      role:
        user.user.RoleID === 2
          ? "Admin"
          : user.user.RoleID === 1
          ? "Teacher"
          : "Student",
      actions: (
        <Button
          variant={"contained"}
          onClick={() => {
            setEditUserDialogOpen(true);
            setUserID(user.ID);
          }}
        >
          Edit
        </Button>
      ),
    };
  });

  React.useEffect(() => {
    if (User.Loaded && !Users.Loaded) {
      props.dispatch(UsersActions.Cycle(User.Token));
    }
  }, [User, Users.Loaded, props]);

  return (
    <>
      <EditUserDialog
        {...props}
        dialogOpen={editUserDialogOpen}
        handleClose={() => {
          setEditUserDialogOpen(false);
          setUserID(null);
        }}
        userID={userID}
      />
      {render && (
        <TablePageCard title={"Users"} table={{ columns, data, options }} />
      )}
    </>
  );
};

export default AdminDashboard;
