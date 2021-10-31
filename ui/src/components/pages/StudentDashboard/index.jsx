import React from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { CoursesActions } from "../../../redux/reducers/Courses";
import { TeachersActions } from "../../../redux/reducers/Teachers";
import { useHistory } from "react-router";
import TablePageCard from "../../individual/TablePageCard";
import CourseRegistrationDialog from "./CourseRegistrationDialog";

const columns = [
  {
    name: "courseName",
    label: "Name",
  },
  {
    name: "title",
    label: "Title",
  },
  {
    name: "teacher",
    label: "Teacher",
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
  search: false,
  download: false,
  print: false,
  viewColumns: false,
  filter: false,
};

const StudentDashboard = (props) => {
  const [courseRegistrationDialogOpen, setCourseRegistrationDialogOpen] = React.useState(false);
  const history = useHistory();
  const User = useSelector((state) => state.User);
  const Courses = useSelector((state) => state.Courses);
  const Teachers = useSelector((state) => state.Teachers);

  React.useEffect(() => {
    if (User.Loaded && !Courses.Loaded && !Teachers.Loaded) {
      props.dispatch(CoursesActions.Cycle(User.Token));
      props.dispatch(TeachersActions.Cycle(User.Token));
    }
  }, [User, Courses.Loaded, Teachers.Loaded, props]);

  const render = User.Loaded && Courses.Loaded;

  const data = Courses.Active.map((course) => {
    const teacher = Teachers.Active.find(
      (t) => t.ID === course.course.CreatedByUserID
    );
    return {
      courseName: course.course.Label,
      title: course.course.Title,
      teacher:
        teacher !== undefined && teacher !== null
          ? `${teacher.FirstName} ${teacher.LastName}`
          : "-",
      actions: (
        <Button
          variant="contained"
          color={"secondary"}
          onClick={() => history.push("/course_home")}
        >
          Home
        </Button>
      ),
    };
  });

  return (
    <>
      <CourseRegistrationDialog
        {...props}
        dialogOpen={courseRegistrationDialogOpen}
        handleClose={() => setCourseRegistrationDialogOpen(false)}
      />
      {render && (
        <TablePageCard
          title={"Courses"}
          table={{ columns, data, options }}
          button={{
            isRendered: true,
            color: "secondary",
            label: "Register for a Course",
            handleClick: () => setCourseRegistrationDialogOpen(true),
          }}
        />
      )}
    </>
  );
};
export default StudentDashboard;
