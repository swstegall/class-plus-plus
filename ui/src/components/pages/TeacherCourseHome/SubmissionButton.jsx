import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const SubmissionButton = (props) => {
  return (
    <Stack spacing={2} direction="row">
      <Button color="primary" variant="contained" > View Submissions</Button>
    </Stack>
  );
};

export default SubmissionButton;
