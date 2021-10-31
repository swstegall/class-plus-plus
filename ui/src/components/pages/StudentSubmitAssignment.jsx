import * as React from "react";
import PageCard from "../individual/PageCard";
import Button from "@mui/material/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

const Content = () => {
  return (
    <div className={"container-fluid"}>
      <div className={"row"}>
        <div className={"col d-flex justify-content-end"}>
          <div className={"px-1"}>
            <Button
              aria-label="UploadFile"
              variant="contained"
              endIcon={<FileUploadOutlinedIcon />}
              onClick={() => console.log("spawnUploadFileDialogue stub.")}
            >
              Upload File
            </Button>
          </div>
          <div className={"px-1"}>
            <Button
              aria-label="submit"
              variant="contained"
              onClick={() => console.log("spawnSubmitAssignmentDialogue stub.")}
            >
              Submit Assignment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentSubmitAssignment = (props) => {
  return <PageCard title={"Submit Assignment"} render={<Content />} />;
};

export default StudentSubmitAssignment;
