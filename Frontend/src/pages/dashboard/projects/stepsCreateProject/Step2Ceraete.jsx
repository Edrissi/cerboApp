import React from 'react';
import { Grid, FormLabel } from '@mui/material';
import InputFileUpload from '@/auteComponents/buttonUpload';
import { styled } from '@mui/material/styles';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

function Step2Create({ data = {}, setData }) {
  const handleFileChange = (name, file) => {
    setData({
      ...data,
      [name]: file
    });
    console.log('Updated Step 2 Data:', { ...data, [name]: file });
  };

  // Ensure default values or empty object for data.step2
  const step2Data = data || {};

  return (
    <Grid container spacing={3}>
      {[
        { label: 'Description du projet', name: 'descriptifProjet' },
        { label: 'Consideration Ethique', name: 'considerationEthique' },
        { label: "Fiche d'informations (arabe ou francais)", name: 'ficheInformationArabeFrancais' },
        { label: 'Fiche de Consentement', name: 'ficheConsentementArabeFrancais' },
        { label: "Attestation d'engagment", name: 'attestationEngagement' },
        { label: 'Attestation CNDP', name: 'attestationCNDP' },
        { label: 'Cv Invistigateur Principal', name: 'cvInvestigateurPrincipal' },
        { label: 'Autres documents', name: 'autresDocuments' }
      ].map(({ label, name }) => (
        <FormGrid item xs={12} md={6} key={name}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <div className="flex justify-center">
            <InputFileUpload file={step2Data[name] || null} onFileChange={(file) => handleFileChange(name, file)} />
          </div>
        </FormGrid>
      ))}
    </Grid>
  );
}

export default Step2Create;
