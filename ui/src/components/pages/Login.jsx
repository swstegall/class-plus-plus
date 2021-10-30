import { Button, Card, Typography } from "@mui/material";
import React from "react";
import * as yup from "yup";
import { Form, FormSpy } from "react-final-form";
import { TextField } from "mui-rff";
import validateFinalForm from "../../utilities/validateFinalForm";

const initialValues = {
  email: null,
  password: null,
};

const validationSchema = yup.object({
  email: yup.string().required().nullable(),
  password: yup.string().required().nullable(),
});

const login = (values) => {
  console.log(values);
};

const Login = () => {
  return (
    <Form
      onSubmit={login}
      initialValues={initialValues}
      validate={validateFinalForm(validationSchema)}
      subscription={{
        form: false,
        pristine: false,
        submitting: false,
        values: false,
      }}
      render={() => (
        <div className={"animate__animated animate__fadeIn container"}>
          <div className={"row"} style={{ height: "25vh" }} />
          <div className={"row"}>
            <div className={"col"} />
            <div className={"col-6 my-auto"}>
              <Card sx={{ minWidth: 275 }}>
                <div className={"row pt-2 px-2"}>
                  <div
                    className={
                      "col d-flex align-items-center justify-content-center"
                    }
                  >
                    <Typography variant="h3" gutterBottom component="div">
                      Class++
                    </Typography>
                  </div>
                </div>
                <div className={"row pt-2 px-2"}>
                  <div className={"col"}>
                    <TextField
                      label={"Email"}
                      name={"email"}
                      variant={"outlined"}
                      type={"email"}
                    />
                  </div>
                </div>
                <div className={"row pt-2 px-2"}>
                  <div className={"col"}>
                    <TextField
                      label={"Password"}
                      name={"password"}
                      variant={"outlined"}
                      type={"password"}
                    />
                  </div>
                </div>
                <div className={"row pt-2 pb-2 px-2"}>
                  <FormSpy
                    subscription={{
                      submitting: true,
                      pristine: true,
                      values: true,
                    }}
                  >
                    {({ submitting, pristine, values }) => (
                      <div
                        className={
                          "col d-flex align-items-center justify-content-end"
                        }
                      >
                        <Button
                          variant={"contained"}
                          disabled={
                            values.email === null ||
                            values.password === null ||
                            submitting ||
                            pristine
                          }
                          onClick={() => login(values)}
                        >
                          Login
                        </Button>
                      </div>
                    )}
                  </FormSpy>
                </div>
              </Card>
            </div>
            <div className={"col"} />
          </div>
        </div>
      )}
    />
  );
};

export default Login;
