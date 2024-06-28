import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

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

export default function InputFileUpload({ file, onFileChange }) {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(file);

  useEffect(() => {
    setSelectedFile(file);
  }, [file]);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setLoading(true);

      // Simulate uploading delay
      setTimeout(() => {
        setSelectedFile(selectedFile);
        onFileChange(selectedFile);
        setLoading(false);
      }, 2000); // Simulated 2 seconds delay for demonstration purposes
    } else {
      alert('Le format du fichier doit être en format PDF.');
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    onFileChange(null);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {!selectedFile ? (
        <>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload PDF'}
            <VisuallyHiddenInput type="file" accept=".pdf" onChange={handleFileUpload} />
          </Button>
        </>
      ) : (
        <div>
          <Typography variant="body1">{selectedFile.name}</Typography>
          <IconButton onClick={handleRemoveFile}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
}
