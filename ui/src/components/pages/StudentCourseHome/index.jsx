import * as React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { format } from "date-fns";
import TablePageCard from "../../individual/TablePageCard";
import ActionsButton from "./ActionsButton";
import { AssignmentsActions } from "../../../redux/reducers/Assignments";
import { CoursesActions } from "../../../redux/reducers/Courses";
import { AssignmentSubmissionsActions } from "../../../redux/reducers/AssignmentSubmissions";

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
  search: false,
  download: false,
  print: false,
  viewColumns: false,
  filter: false,
};

const StudentCourseHome = (props) => {
  const history = useHistory();
  const { courseID } = useParams();
  const Assignments = useSelector((state) => state.Assignments);
  const AssignmentSubmissions = useSelector(
    (state) => state.AssignmentSubmissions
  );
  const User = useSelector((state) => state.User);
  const Courses = useSelector((state) => state.Courses);
  const course = Courses.Active.find((c) => c.course.ID === courseID);
  const render =
    User.Loaded &&
    Courses.Loaded &&
    Assignments.Loaded &&
    AssignmentSubmissions.Loaded;

  React.useEffect(() => {
    if (User.Loaded && courseID !== undefined) {
      props.dispatch(AssignmentsActions.Cycle(User.Token, courseID));
    }
    if (User.Loaded && !Courses.Loaded) {
      props.dispatch(CoursesActions.Cycle(User.Token));
    }
    if (User.Loaded && !AssignmentSubmissions.Loaded) {
      props.dispatch(AssignmentSubmissionsActions.Cycle(User.Token));
    }
  }, [courseID]);

  const data = Assignments.Active.map((assignment) => {
    let renderActions = true;
    AssignmentSubmissions.Active.forEach((submission) => {
      if (submission.AssignmentID === assignment.ID) {
        renderActions = false;
      }
    });
    return {
      title: assignment.Title,
      dueDate: format(new Date(assignment.DueDate), "Pp"),
      actions: renderActions ? (
        <ActionsButton
          sendToViewAssignment={() =>
            history.push(
              `/course_home/${course.course.ID}/${assignment.ID}/view`
            )
          }
          sendToSubmitAssignment={() =>
            history.push(
              `/course_home/${course.course.ID}/${assignment.ID}/submit`
            )
          }
        />
      ) : (
        "Submitted"
      ),
    };
  });

  return (
    <>
      {render && (
        <TablePageCard
          title={`${course.course.Label}: ${course.course.Title}`}
          table={{ columns, data, options }}
          button={{
            isRendered: false,
          }}
        />
      )}
    </>
  );
};

export default StudentCourseHome;
