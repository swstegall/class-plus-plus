import React from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { Form, FormSpy } from "react-final-form";
import * as yup from "yup";
import { Button, Card, Container, MenuItem, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LockIcon from "@mui/icons-material/Lock";
import validateFinalForm from "../../utilities/validateFinalForm";
import { Select, TextField } from "mui-rff";
import { UserActions } from "../../redux/reducers/User";

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
];

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValues = {
  email: null,
  password: null,
  firstName: null,
  lastName: null,
  grade: null,
  role: null,
};

const validationSchema = yup.object({
  email: yup.string().required().nullable(),
  password: yup.string().required().nullable(),
  firstName: yup.string().required().nullable(),
  lastName: yup.string().required().nullable(),
  grade: yup.string().required().nullable(),
  role: yup.number().required().nullable(),
});

const CreateUser = (props) => {
  const classes = useStyles();

  const onSubmit = async (values) => {
    await props.dispatch(
      UserActions.Register(
        values.email,
        values.password,
        values.firstName,
        values.lastName,
        values.grade,
        values.role
      )
    );
  };

  return (
    <div className={"animate__animated animate__fadeIn container"}>
      <div className={"row"} style={{ height: "25vh" }} />
      <div className={"row"}>
        <div className={"col"} />
        <div className={"col-6 my-auto"}>
          <Card sx={{ minWidth: 275 }}>
            <Container component="main" maxWidth="xs">
              <div className={classes.paper}>
                <Avatar sx={{ bgcolor: "#43A048" }}>
                  <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Create User
                </Typography>
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
                    <form className={classes.form} onSubmit={handleSubmit}>
                      <div className={"row"}>
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
                            label={"Password"}
                            name={"password"}
                            variant={"outlined"}
                            required
                            type={"password"}
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
                      <div className={"row pt-2"}>
                        <div className={"col"}>
                          <FormSpy
                            subscription={{
                              values: true,
                              submitting: true,
                              pristine: true,
                            }}
                          >
                            {({ values, submitting, pristine }) => (
                              <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                                type="submit"
                                disabled={
                                  values.email === null ||
                                  values.password === null ||
                                  values.firstName === null ||
                                  values.lastName === null ||
                                  values.grade === null ||
                                  values.role === null ||
                                  submitting ||
                                  pristine
                                }
                              >
                                Create User
                              </Button>
                            )}
                          </FormSpy>
                        </div>
                      </div>
                      <div className={"row pt-1 pb-2"}>
                        <div className={"col"}>
                          <Link to="/login">Login</Link>
                        </div>
                      </div>
                    </form>
                  )}
                />
              </div>
            </Container>
          </Card>
        </div>
        <div className={"col"} />
      </div>
    </div>
  );
};

export default CreateUser;
