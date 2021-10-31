import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { Form, FormSpy } from "react-final-form";
import { Button, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import validateFinalForm from "../../../utilities/validateFinalForm";
import { CoursesActions } from "../../../redux/reducers/Courses";
import { CoursesListActions } from "../../../redux/reducers/CoursesList";
import { Select } from "mui-rff";

const initialValues = {
  courseID: null,
};

const validationSchema = yup.object({
  courseID: yup.string().required().nullable(),
});

const CourseRegistrationDialog = (props) => {
  const User = useSelector((state) => state.User);
  const Courses = useSelector((state) => state.Courses);
  const CoursesList = useSelector((state) => state.CoursesList).Active.filter(
    (clItem) => {
      let valid = true;
      Courses.Active.forEach((course) => {
        if (course.ID === clItem.ID) {
          valid = false;
        }
      });
      return valid;
    }
  );
  const render = Courses.Loaded && CoursesList.Loaded;

  React.useEffect(() => {
    if (User.Loaded && !CoursesList.Loaded) {
      props.dispatch(CoursesListActions.Cycle(User.Token));
    } else if (User.Loaded && !Courses.Loaded) {
      props.dispatch(CoursesActions.Cycle(User.Token));
    }
  }, [User, CoursesList.Loaded, props]);

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
                aria-labelledby="create-user-dialog-title"
                aria-describedby="create-user-dialog-description"
              >
                <DialogTitle id="create-user-dialog-title">
                  Create Course
                </DialogTitle>
                <DialogContent>
                  <div className={"row pt-2"}>
                    <div className={"col"}>
                      <Select
                        variant={"outlined"}
                        label={"Course"}
                        displayEmpty
                        name="courseID"
                        required
                      >
                        <MenuItem value={null}>Select a Course</MenuItem>
                        {CoursesList.Active.map((course) => (
                          <MenuItem
                            value={course.ID}
                            key={`student-register-for-course-select-${course.ID}`}
                          >
                            {`${course.Label} ${course.Title}`}
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
                          Add
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

export default CourseRegistrationDialog;
