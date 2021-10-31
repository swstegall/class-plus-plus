import * as React from "react";
import Button from "@mui/material/Button";
import PageCard from "../individual/PageCard";

const Content = () => {
  return <>Assignment description goes here</>;
};

const StudentViewAssignment = (props) => {
  return <PageCard title={"Assignment Name"} render={<Content />} />;
};

export default StudentViewAssignment;
