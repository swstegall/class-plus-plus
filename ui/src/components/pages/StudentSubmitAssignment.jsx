import * as React from "react";
import PageCard from "../individual/PageCard";

const Content = () => {
  return <>pee pee poo poo</>;
};

const StudentSubmitAssignment = (props) => {
  return <PageCard title={"Submit Assignment"} render={<Content />} />;
};

export default StudentSubmitAssignment;
