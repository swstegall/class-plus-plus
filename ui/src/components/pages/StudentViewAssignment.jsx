import * as React from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import PageCard from "../individual/PageCard";

const Content = () => {
  const history = useHistory();

  return (
    <>
      <div className={"container-fluid"}>
        <div className={"row"}>
          <div className={"col"}>
            <p>Assignment description goes here.</p>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col d-flex justify-content-end"}>
            <Button
              variant={"contained"}
              onClick={() => history.push("/submit_assignment")}
            >
              Submit Assignment
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const StudentViewAssignment = (props) => {
  return <PageCard title={"Assignment Name"} render={<Content />} />;
};

export default StudentViewAssignment;
