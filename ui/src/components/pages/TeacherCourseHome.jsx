import React from "react";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PageCard from "../individual/PageCard";

const Content = () => {
  return (
    <>
      <Fab variant="extend" size="mid" color="primary" aria-label="add" style={{marginTop:500}}>
        <AddIcon />
      </Fab>
      <Fab size="mid" color="secondary" aria-label="edit" style={{marginTop:500}}>
        <EditIcon />
      </Fab>
    </>
  );
};

const TeacherCourseHome = () => {
  return <PageCard title={"Course Title"} render={<Content />} />;
};

export default TeacherCourseHome;
