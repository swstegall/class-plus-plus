import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TablePageCard from "../../individual/TablePageCard";
import { UsersActions } from "../../../redux/reducers/Users";
import EditButton from "./EditButton";
import UploadButton from "./UploadButton";
import SubmissionButton from "./SubmissionButton";
import GradeButton from "./GradeButton";


const columns = [
  {
    name: "Assignment",
    label: "Assignment",
  },
  {
    name: "dueDate",
    label: "Due Date",
  },
  {
    name: "editAssignment",
    label: "Edit Assignment",
  },
  {
    name: "uploadAssignment",
    label: "Upload Assignment",
  },
  {
    name: "viewSubmissions",
    label: "View Submissions",
  },
  {
    name: "uploadGrade",
    label: "UploadGrades",
  },
];

const options = {
  filterType: "multiselect",
  selectableRowsHeader: false,
  selectableRowsHideCheckboxes: true,
};

const TeacherCourseHome = (props) => {
  const history = useHistory();
  const Courses = {
    Loaded: true,
    Active: [
      {
        ID: "test",
        Label: "test",
        Title: "test",
        Description: "test",
      },
      {
        ID: "test",
        Label: "test",
        Title: "test",
        Description: "test",
      },
      {
        ID: "test",
        Label: "test",
        Title: "test",
        Description: "test",
      },
      {
        ID: "test",
        Label: "test",
        Title: "test",
        Description: "test",
      },
      {
        ID: "test",
        Label: "test",
        Title: "test",
        Description: "test",
      },
    ],
  };
  const User = useSelector((state) => state.User);
  const render = User.Loaded && Courses.Loaded;

  const data = Courses.Active.map((course) => {
    return {
      assignment: course.Assignment,
      dueDate: 9,
      editAssignment: (
        <EditButton
          spawnEditCourseDialog={() =>
            console.log("spawnEditCourseDialog stub.")
          }
        />
      ),
      uploadAssignment: (
        <UploadButton
          spawnUploadAssignmentDialog={() =>
            console.log("spawnUploadAssignmentDialog stub.")
          }
        />
      ),
      viewSubmissions: (
        <SubmissionButton
          spawnViewSubmissionsDialog={() =>
            console.log("spawnViewSubmsissionsDialog stub.")
          }
        />
      ),
     uploadGrade: (
        <GradeButton
          spawnUploadGradeDialog={() =>
            console.log("spawnUploadGradeDialog stub.")
          }
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
      {render && (
        <TablePageCard
          title={"Course Home"}
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
