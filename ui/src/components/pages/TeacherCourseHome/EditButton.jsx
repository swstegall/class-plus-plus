import React from "react";
import Stack from "@mui/material/Stack";
import IconButton from '@mui/material/IconButton';
import EditIcon from "@mui/icons-material/Edit";

const EditButton = (props) => {
  return (
    <Stack spacing={2} direction="row">
    <IconButton aria-label="edit" color="primary" >
         <EditIcon />
       </IconButton>
     </Stack>
  );
};

export default EditButton;
