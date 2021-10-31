import * as React from "react";
import Button from "@mui/material/Button";
import { useHistory, useParams } from "react-router-dom";
import PageCard from "../individual/PageCard";
import { useSelector } from "react-redux";
import { AssignmentsActions } from "../../redux/reducers/Assignments";
import { CoursesActions } from "../../redux/reducers/Courses";

const Content = ({ courseID, assignmentID, description }) => {
  const history = useHistory();

  return (
    <div className={"container-fluid"}>
      <div className={"row"}>
        <div className={"col"}>
          <p>{description}</p>
        </div>
      </div>
      <div className={"row"}>
        <div className={"col d-flex justify-content-end"}>
          <Button
            variant={"contained"}
            color={"secondary"}
            onClick={() =>
              history.push(`/course_home/${courseID}/${assignmentID}/submit`)
            }
          >
            Submit Assignment
          </Button>
        </div>
      </div>
    </div>
  );
};

const StudentViewAssignment = (props) => {
  const { courseID, assignmentID } = useParams();
  const Assignments = useSelector((state) => state.Assignments);
  const User = useSelector((state) => state.User);
  const Courses = useSelector((state) => state.Courses);
  const render = User.Loaded && Courses.Loaded && Assignments.Loaded;
  const assignment = Assignments.Active.find((a) => a.ID === assignmentID);

  React.useEffect(() => {
    if (User.Loaded && courseID !== undefined) {
      props.dispatch(AssignmentsActions.Cycle(User.Token, courseID));
    } else if (User.Loaded && !Courses.Loaded) {
      props.dispatch(CoursesActions.Cycle(User.Token));
    }
  }, [courseID]);

  return (
    <>
      {render && (
        <PageCard
          title={assignment.Title}
          render={
            <Content
              courseID={courseID}
              assignmentID={assignmentID}
              description={assignment.Description}
            />
          }
        />
      )}
    </>
  );
};

export default StudentViewAssignment;
