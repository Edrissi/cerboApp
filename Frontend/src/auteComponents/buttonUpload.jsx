import React,{useState} from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 0.4,
});


export default function InputFileUpload() {
  const [loading, setLoading] = React.useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Set loading to true to indicate that file is being uploaded
      setLoading(true);

      // Simulate uploading delay
      setTimeout(() => {
        // After a delay, you can perform any upload logic here
        // Once upload is complete, you can set loading back to false
        setLoading(false);
      }, 2000); // Simulated 2 seconds delay for demonstration purposes
    }
  }
  return (


    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      disabled={loading}
    >
      Upload file
      <VisuallyHiddenInput type="file" onChange={handleFileUpload}/>
    </Button>
  );
}