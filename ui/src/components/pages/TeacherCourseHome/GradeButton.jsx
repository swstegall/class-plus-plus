import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const GradeButton = (props) => {
  return (
    <Stack spacing={2} direction="row">
      <Button color="primary" variant="contained" > View Grades</Button>
    </Stack>
  );
};

export default GradeButton;
