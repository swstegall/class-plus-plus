import React from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { Form, FormSpy } from "react-final-form";
import * as yup from "yup";
import { Button, Card, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LockIcon from "@mui/icons-material/Lock";
import validateFinalForm from "../../utilities/validateFinalForm";
import { TextField } from "mui-rff";
import { UserActions } from "../../redux/reducers/User";

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
};

const validationSchema = yup.object({
  email: yup.string().required().nullable(),
  password: yup.string().required().nullable(),
});

const Login = (props) => {
  const classes = useStyles();

  const onSubmit = async (values) => {
    await props.dispatch(UserActions.Login(values.email, values.password));
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
                  Class++
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
                                  submitting ||
                                  pristine
                                }
                              >
                                Login
                              </Button>
                            )}
                          </FormSpy>
                        </div>
                      </div>
                      <div className={"row pt-1 pb-2"}>
                        <div className={"col"}>
                          <Link to="/create_user">Create User</Link>
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

export default Login;
