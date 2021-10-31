import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TablePageCard from "../../individual/TablePageCard";
import EditButton from "./EditButton";
import UploadButton from "./UploadButton";
import SubmissionButton from "./SubmissionButton";
import GradeButton from "./GradeButton";
import { AssignmentsActions } from "../../../redux/reducers/Assignments";
import { CoursesActions } from "../../../redux/reducers/Courses";

const columns = [
  {
    name: "title",
    label: "Title",
  },
  {
    name: "dueDate",
    label: "Due Date",
  },
  // {
  //   name: "editAssignment",
  //   label: "Edit Assignment",
  // },
  // {
  //   name: "uploadAssignment",
  //   label: "Upload Assignment",
  // },
  // {
  //   name: "viewSubmissions",
  //   label: "View Submissions",
  // },
  // {
  //   name: "uploadGrade",
  //   label: "ViewGrades",
  // },
];

const options = {
  filterType: "multiselect",
  selectableRowsHeader: false,
  selectableRowsHideCheckboxes: true,
};

const TeacherCourseHome = (props) => {
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
      dueDate: "-",
      // editAssignment: (
      //   <EditButton
      //     spawnEditCourseDialog={() =>
      //       console.log("spawnEditCourseDialog stub.")
      //     }
      //   />
      // ),
      // uploadAssignment: (
      //   <UploadButton
      //     spawnUploadAssignmentDialog={() =>
      //       console.log("spawnUploadAssignmentDialog stub.")
      //     }
      //   />
      // ),
      // viewSubmissions: (
      //   <SubmissionButton
      //     spawnViewSubmissionsDialog={() =>
      //       console.log("spawnViewSubmsissionsDialog stub.")
      //     }
      //   />
      // ),
      // uploadGrade: (
      //   <GradeButton
      //     spawnUploadGradeDialog={() =>
      //       console.log("spawnUploadGradeDialog stub.")
      //     }
      //   />
      // ),
    };
  });

  return (
    <>
      {render && (
        <TablePageCard
          title={`${course.Label}: ${course.Title}`}
          table={{ columns, data, options }}
          button={{
            isRendered: false,
          }}
        />
      )}
    </>
  );
};

export default TeacherCourseHome;
