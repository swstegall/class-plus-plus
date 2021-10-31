import React from "react";
import Stack from "@mui/material/Stack";
import IconButton from '@mui/material/IconButton';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';


const UploadButton = (props) => {
  return (
    <Stack spacing={2} direction="row">
   <IconButton aria-label="upload" color="primary" >
        <FileUploadOutlinedIcon />
      </IconButton>
    </Stack>
  );
};

export default UploadButton;
