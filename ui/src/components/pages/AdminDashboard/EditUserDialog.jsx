import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { Form, FormSpy } from "react-final-form";
import { Button, MenuItem } from "@mui/material";
import { Select, TextField } from "mui-rff";
import { useSelector } from "react-redux";
import validateFinalForm from "../../../utilities/validateFinalForm";
import { UsersActions } from "../../../redux/reducers/Users";

const gradeOptions = [
  { name: "Kindergarten", value: "K" },
  { name: "First Grade", value: "1" },
  { name: "Second Grade", value: "2" },
  { name: "Third Grade", value: "3" },
  { name: "Fourth Grade", value: "4" },
  { name: "Fifth Grade", value: "5" },
  { name: "Sixth Grade", value: "6" },
  { name: "Seventh Grade", value: "7" },
  { name: "Eigth Grade", value: "8" },
  { name: "Ninth Grade", value: "9" },
  { name: "Tenth Grade", value: "10" },
  { name: "Eleventh Grade", value: "11" },
  { name: "Twelfth Grade", value: "12" },
];

const roleOptions = [
  { name: "Student", value: 0 },
  { name: "Teacher", value: 1 },
  { name: "Administrator", value: 2 },
];

const validationSchema = yup.object({
  email: yup.string().required().nullable(),
  firstName: yup.string().required().nullable(),
  lastName: yup.string().required().nullable(),
  grade: yup.string().required().nullable(),
  role: yup.number().required().nullable(),
});

const EditUserDialog = (props) => {
  const User = useSelector((state) => state.User);
  const UserToEdit = useSelector((state) => state.Users).Active.find(
    (u) => u.ID === props.userID
  );
  const render = UserToEdit !== undefined && UserToEdit !== null;
  let initialValues = {};

  if (render) {
    initialValues = {
      email: UserToEdit.Email,
      firstName: UserToEdit.user.FirstName,
      lastName: UserToEdit.user.LastName,
      grade: UserToEdit.user.Grade,
      role: UserToEdit.user.RoleID,
    };
  }

  const onSubmit = async (values) => {
    props.dispatch(
      UsersActions.AdminUpdate(User.Token, {
        Email: values.email,
        FirstName: values.firstName,
        Grade: values.grade,
        LastName: values.lastName,
        RoleID: values.role,
        UserID: props.userID,
      })
    );
  };

  return (
    <>
      {render && (
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          validate={validateFinalForm(validationSchema)}
          subscription={{
            form: false,
            submitting: false,
            pristine: false,
            values: false,
          }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Dialog
                fullWidth
                maxWidth={"sm"}
                open={props.dialogOpen}
                onClose={props.handleClose}
                aria-labelledby="edit-user-dialog-title"
                aria-describedby="edit-user-dialog-description"
              >
                <DialogTitle id="edit-user-dialog-title">Edit User</DialogTitle>
                <DialogContent>
                  <div className={"row pt-2"}>
                    <div className={"col"}>
                      <TextField
                        fullWidth
                        label={"Email"}
                        name={"email"}
                        variant={"outlined"}
                        required
                        type={"email"}
                      />
                    </div>
                  </div>
                  <div className={"row pt-2"}>
                    <div className={"col"}>
                      <TextField
                        fullWidth
                        label={"First Name"}
                        name={"firstName"}
                        variant={"outlined"}
                        required
                      />
                    </div>
                  </div>
                  <div className={"row pt-2"}>
                    <div className={"col"}>
                      <TextField
                        fullWidth
                        label={"Last Name"}
                        name={"lastName"}
                        variant={"outlined"}
                        required
                      />
                    </div>
                  </div>
                  <div className={"row pt-2"}>
                    <div className={"col"}>
                      <Select
                        variant={"outlined"}
                        label={"Grade"}
                        displayEmpty
                        name="grade"
                        required
                      >
                        <MenuItem value={null}>Select a Grade</MenuItem>
                        {gradeOptions.map((gradeOption) => (
                          <MenuItem
                            value={gradeOption.value}
                            key={`create-user-grade-select-${gradeOption.name}-${gradeOption.value}`}
                          >
                            {gradeOption.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className={"row pt-2"}>
                    <div className={"col"}>
                      <Select
                        variant={"outlined"}
                        label={"Role"}
                        displayEmpty
                        name="role"
                        required
                      >
                        <MenuItem value={null}>Select a Role</MenuItem>
                        {roleOptions.map((roleOption) => (
                          <MenuItem
                            value={roleOption.value}
                            key={`create-user-role-select-${roleOption.name}-${roleOption.value}`}
                          >
                            {roleOption.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                </DialogContent>
                <DialogActions>
                  <FormSpy
                    subscription={{
                      values: true,
                      submitting: true,
                      pristine: true,
                    }}
                  >
                    {({ values, submitting, pristine }) => (
                      <>
                        <Button
                          variant={"outlined"}
                          onClick={props.handleClose}
                        >
                          Close
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={
                            values.email === null ||
                            values.firstName === null ||
                            values.lastName === null ||
                            values.grade === null ||
                            values.role === null ||
                            submitting ||
                            pristine
                          }
                          onClick={() => {
                            onSubmit(values);
                            props.handleClose();
                          }}
                        >
                          Update
                        </Button>
                      </>
                    )}
                  </FormSpy>
                </DialogActions>
              </Dialog>
            </form>
          )}
        />
      )}
    </>
  );
};

export default EditUserDialog;
