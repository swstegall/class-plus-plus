import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { Form, FormSpy } from "react-final-form";
import { Button } from "@mui/material";
import { TextField } from "mui-rff";
import { useSelector } from "react-redux";
import validateFinalForm from "../../../utilities/validateFinalForm";
import { CoursesActions } from "../../../redux/reducers/Courses";

const initialValues = {
  label: null,
  title: null,
  description: null,
};

const validationSchema = yup.object({
  label: yup.string().required().nullable(),
  title: yup.string().required().nullable(),
  description: yup.string().required().nullable(),
});

const CreateCourseDialog = (props) => {
  const User = useSelector((state) => state.User);

  const onSubmit = async (values) => {
    props.dispatch(
      CoursesActions.TeacherCreate(User.Token, {
        Label: values.label,
        Title: values.title,
        Description: values.description,
        ID: props.courseID,
      })
    );
  };

  return (
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
            aria-labelledby="create-user-dialog-title"
            aria-describedby="create-user-dialog-description"
          >
            <DialogTitle id="create-user-dialog-title">Create Course</DialogTitle>
            <DialogContent>
              <div className={"row pt-2"}>
                <div className={"col"}>
                  <TextField
                    fullWidth
                    label={"Label"}
                    name={"label"}
                    variant={"outlined"}
                    required
                  />
                </div>
              </div>
              <div className={"row pt-2"}>
                <div className={"col"}>
                  <TextField
                    fullWidth
                    label={"Title"}
                    name={"title"}
                    variant={"outlined"}
                    required
                  />
                </div>
              </div>
              <div className={"row pt-2"}>
                <div className={"col"}>
                  <TextField
                    fullWidth
                    label={"Description"}
                    name={"description"}
                    variant={"outlined"}
                    multiline
                    rows={4}
                    required
                  />
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
                    <Button variant={"outlined"} onClick={props.handleClose}>
                      Close
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={
                        values.label === null ||
                        values.title === null ||
                        values.description === null ||
                        submitting ||
                        pristine
                      }
                      onClick={() => {
                        onSubmit(values);
                        props.handleClose();
                      }}
                    >
                      Create
                    </Button>
                  </>
                )}
              </FormSpy>
            </DialogActions>
          </Dialog>
        </form>
      )}
    />
  );
};

export default CreateCourseDialog;
