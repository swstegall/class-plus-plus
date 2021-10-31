import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { Form, FormSpy } from "react-final-form";
import { Button } from "@mui/material";
import { DateTimePicker, TextField } from "mui-rff";
import { useSelector } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import validateFinalForm from "../../../utilities/validateFinalForm";
import { AssignmentsActions } from "../../../redux/reducers/Assignments";

const initialValues = {
  title: null,
  description: null,
  dueDate: null,
};

const validationSchema = yup.object({
  title: yup.string().required().nullable(),
  description: yup.string().required().nullable(),
  dueDate: yup.date().required().nullable(),
});

const CreateAssignmentDialog = (props) => {
  const User = useSelector((state) => state.User);

  const onSubmit = async (values) => {
    props.dispatch(
      AssignmentsActions.Create(User.Token, {
        Title: values.title,
        Description: values.description,
        DueDate: values.dueDate,
        CourseID: props.courseID,
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
            aria-labelledby="create-assignment-dialog-title"
            aria-describedby="create-assignment-dialog-description"
          >
            <DialogTitle id="create-assignment-dialog-title">
              Create Assignment
            </DialogTitle>
            <DialogContent>
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
              <div className={"row pt-2"}>
                <div className={"col"}>
                  <DateTimePicker
                    dateFunsUtils={DateFnsUtils}
                    label={"Due Date"}
                    variant={"inline"}
                    inputVariant={"outlined"}
                    minDate={new Date()}
                    name={"dueDate"}
                    format={"MM/dd/yyyy"}
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
                    <Button
                      variant={"outlined"}
                      color={"secondary"}
                      onClick={props.handleClose}
                    >
                      Close
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      disabled={
                        values.title === null ||
                        values.description === null ||
                        values.dueDate === null ||
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

export default CreateAssignmentDialog;
