import * as React from "react";
import PageCard from "../individual/PageCard";
import Button from "@mui/material/Button";
import axios from "axios";
import C from "../../utilities/constants";
import { AppActions } from "../../redux/reducers/App";
import { UserActions } from "../../redux/reducers/User";
import { NotificationActions } from "../../redux/reducers/Notification";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AssignmentsActions } from "../../redux/reducers/Assignments";
import { CoursesActions } from "../../redux/reducers/Courses";
import { AssignmentSubmissionsActions } from "../../redux/reducers/AssignmentSubmissions";

const Content = (props) => {
  const history = useHistory();
  const User = useSelector((state) => state.User);
  const Courses = useSelector((state) => state.Courses);
  const render = User.Loaded && Courses.Loaded;
  const [selectedFile, setSelectedFile] = React.useState(null);

  React.useEffect(() => {
    if (User.Loaded && props.courseID !== undefined) {
      props.dispatch(AssignmentsActions.Cycle(User.Token, props.courseID));
    } else if (User.Loaded && !Courses.Loaded) {
      props.dispatch(CoursesActions.Cycle(User.Token));
    }
  }, [props.courseID]);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    const token = User.Token;
    props.dispatch(AppActions.SetLoading(true));
    var reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = async () => {
      try {
        await axios({
          method: "post",
          url: `${C.localUrl}assignments/submit`,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          data: {
            UserID: User.UserID,
            AssignmentID: props.assignmentID,
            File: reader.result,
          },
        });
        props.dispatch(
          NotificationActions.Open({
            Message: "Assignment has been submitted successfully.",
            Severity: "success",
          })
        );
        props.dispatch(AssignmentSubmissionsActions.Reset());
        history.push("/course_home");
      } catch (error) {
        localStorage.clear();
        props.dispatch(UserActions.Reset());
        props.dispatch(
          NotificationActions.Open({
            Message: "Session invalid. Login again.",
            Severity: "error",
          })
        );
      }
    };
    reader.onerror = () => {
      localStorage.clear();
      props.dispatch(UserActions.Reset());
      props.dispatch(
        NotificationActions.Open({
          Message: "Session invalid. Login again.",
          Severity: "error",
        })
      );
    };
    props.dispatch(AppActions.SetLoading(false));
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h4>File Details:</h4>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <p>Choose a file before pressing submit.</p>
        </div>
      );
    }
  };

  return (
    <>
      {render && (
        <div className={"container-fluid"}>
          <div className={"row"}>
            <div className={"col"}>{fileData()}</div>
          </div>
          <div className={"row"}>
            <div className={"col d-flex justify-content-end"}>
              <div className={"px-1"}>
                <input type="file" onChange={onFileChange} />
              </div>
              <div className={"px-1"}>
                <Button
                  aria-label="submit"
                  variant="contained"
                  color={"secondary"}
                  onClick={onFileUpload}
                >
                  Submit Assignment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const StudentSubmitAssignment = (props) => {
  const { courseID, assignmentID } = useParams();
  return (
    <PageCard
      title={"Submit Assignment"}
      render={
        <Content {...props} courseID={courseID} assignmentID={assignmentID} />
      }
    />
  );
};

export default StudentSubmitAssignment;
