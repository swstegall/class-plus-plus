import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TablePageCard from "../../individual/TablePageCard";
import { UsersActions } from "../../../redux/reducers/Users";
import ActionsButton from "./ActionsButton";
import { CoursesActions } from "../../../redux/reducers/Courses";
import { CourseRegistrationsActions } from "../../../redux/reducers/CourseRegistrations";
import EditCourseDialog from "./EditCourseDialog";
import CreateCourseDialog from "./CreateCourseDialog";

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
    name: "numStudents",
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
  const history = useHistory();
  const [createCourseDialogOpen, setCreateCourseDialogOpen] =
    React.useState(false);
  const [editCourseDialogOpen, setEditCourseDialogOpen] = React.useState(false);
  const [courseID, setCourseID] = React.useState(false);
  const User = useSelector((state) => state.User);
  const Courses = useSelector((state) => state.Courses);
  const CourseRegistrations = useSelector((state) => state.CourseRegistrations);

  React.useEffect(() => {
    if (User.Loaded && !Courses.Loaded && !CourseRegistrations.Loaded) {
      props.dispatch(CoursesActions.Cycle(User.Token));
      props.dispatch(CourseRegistrationsActions.Cycle(User.Token));
    }
  }, [User, Courses.Loaded, props]);

  const render = User.Loaded && Courses.Loaded;

  const data = Courses.Active.map((course) => {
    let numStudents = 0;
    CourseRegistrations.Active.forEach((registration) => {
      if (registration.CourseID === course.ID) {
        ++numStudents;
      }
    });
    return {
      courseName: course.Label,
      title: course.Title,
      numStudents,
      actions: (
        <ActionsButton
          sendToCourseHome={() => history.push("/course_home")}
          spawnEditCourseDialog={() => {
            setCourseID(course.ID);
            setEditCourseDialogOpen(true);
          }}
        />
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
      <CreateCourseDialog
        {...props}
        dialogOpen={createCourseDialogOpen}
        handleClose={() => setCreateCourseDialogOpen(false)}
      />
      <EditCourseDialog
        {...props}
        courseID={courseID}
        dialogOpen={editCourseDialogOpen}
        handleClose={() => {
          setEditCourseDialogOpen(false);
          setCourseID(null);
        }}
      />
      {render && (
        <TablePageCard
          title={"Courses"}
          table={{ columns, data, options }}
          button={{
            isRendered: true,
            label: "New Course",
            color: "secondary",
            handleClick: () => setCreateCourseDialogOpen(true),
          }}
        />
      )}
    </>
  );
};

export default TeacherDashboard;
