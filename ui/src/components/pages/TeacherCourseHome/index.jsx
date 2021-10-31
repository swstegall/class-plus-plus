import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import TablePageCard from "../../individual/TablePageCard";
import { AssignmentsActions } from "../../../redux/reducers/Assignments";
import { CoursesActions } from "../../../redux/reducers/Courses";
import CreateAssignmentDialog from "./CreateAssignmentDialog";
import ActionsButton from "./ActionsButton";
import EditAssignmentDialog from "./EditAssignmentDialog";

const columns = [
  {
    name: "title",
    label: "Title",
  },
  {
    name: "dueDate",
    label: "Due Date",
  },
  {
    name: "actions",
    label: "Actions",
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

const TeacherCourseHome = (props) => {
  const [editAssignmentDialogOpen, setEditAssignmentDialogOpen] =
    React.useState(false);
  const [assignmentID, setAssignmentID] = React.useState(null);
  const [createAssignmentDialogOpen, setCreateAssignmentDialogOpen] =
    React.useState(false);
  const { courseID } = useParams();
  const Assignments = useSelector((state) => state.Assignments);
  const User = useSelector((state) => state.User);
  const Courses = useSelector((state) => state.Courses);
  const course = Courses.Active.find((c) => c.ID === courseID);
  const render = User.Loaded && Courses.Loaded && Assignments.Loaded;

  React.useEffect(() => {
    if (User.Loaded && courseID !== undefined) {
      props.dispatch(AssignmentsActions.Cycle(User.Token, courseID));
    } else if (User.Loaded && !Courses.Loaded) {
      props.dispatch(CoursesActions.Cycle(User.Token));
    }
  }, [courseID]);

  const data = Assignments.Active.map((assignment) => {
    return {
      title: assignment.Title,
      dueDate: format(new Date(assignment.DueDate), "Pp"),
      actions: (
        <ActionsButton
          sendToGradeSubmissions={() =>
            console.log("send to grade submission stub.")
          }
          spawnEditAssignmentDialog={() => {
            setAssignmentID(assignment.ID);
            setEditAssignmentDialogOpen(true);
          }}
        />
      ),
    };
  });

  return (
    <>
      <EditAssignmentDialog
        {...props}
        dialogOpen={editAssignmentDialogOpen}
        handleClose={() => {
          setEditAssignmentDialogOpen(false);
          setAssignmentID(null);
        }}
        courseID={courseID}
        assignmentID={assignmentID}
      />
      <CreateAssignmentDialog
        {...props}
        dialogOpen={createAssignmentDialogOpen}
        handleClose={() => setCreateAssignmentDialogOpen(false)}
        courseID={courseID}
      />
      {render && (
        <TablePageCard
          title={`${course.Label}: ${course.Title}`}
          table={{ columns, data, options }}
          button={{
            isRendered: true,
            label: "New Assignment",
            color: "secondary",
            handleClick: () => setCreateAssignmentDialogOpen(true),
          }}
        />
      )}
    </>
  );
};

export default TeacherCourseHome;
