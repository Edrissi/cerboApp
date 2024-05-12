
import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import InputFileUpload from '@/auteComponents/buttonUpload';


const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

function Step2Create() {
  return (
    <Grid container spacing={3}>

      <FormGrid item xs={3} md={6}>
        <FormLabel htmlFor="Description du projet">"Description du projet"</FormLabel>
        <div className="flex justify-center">
          <InputFileUpload /> 
        </div> 
      </FormGrid>

      <FormGrid item xs={3} md={6}>
        <FormLabel htmlFor="Consideration Ethique">Consideration Ethique</FormLabel>
        <div className="flex justify-center">
          <InputFileUpload /> 
        </div>
      </FormGrid>

      <FormGrid item xs={3} md={6}>
        <FormLabel htmlFor="fiche d'informations">Fiche d'informations (arabe ou francais)</FormLabel>
        <div className="flex justify-center">
          <InputFileUpload /> 
        </div> 
      </FormGrid>

      <FormGrid item xs={3} md={6}>
        <FormLabel htmlFor="fiche de Consentement">Fiche de Consentement</FormLabel>
        <div className="flex justify-center">
          <InputFileUpload /> 
        </div>
      </FormGrid>

      <FormGrid item xs={3} md={6}>
        <FormLabel htmlFor="Attestation d'engagment">Attestation d'engagment</FormLabel>
        <div className="flex justify-center">
          <InputFileUpload /> 
        </div> 
      </FormGrid>

      <FormGrid item xs={3} md={6}>
        <FormLabel htmlFor="attestation CNDP">Attestation CNDP</FormLabel>
        <div className="flex justify-center">
          <InputFileUpload /> 
        </div>
      </FormGrid>

      <FormGrid item xs={3} md={6}>
        <FormLabel htmlFor="fileUpload">Cv Invistigateur Principal</FormLabel>
        <div className="flex justify-center">
          <InputFileUpload /> 
        </div> 
      </FormGrid>

      <FormGrid item xs={3} md={6}>
        <FormLabel htmlFor="fileUpload">Autres documents</FormLabel>
        <div className="flex justify-center">
          <InputFileUpload /> 
        </div> 
      </FormGrid>

    </Grid>
    )}
   
export default Step2Create;