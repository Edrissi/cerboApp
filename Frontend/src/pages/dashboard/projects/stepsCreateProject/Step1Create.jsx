import React from 'react';
import { Grid, TextField, FormControlLabel, Checkbox, FormLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

function Step1Create({ data = {}, setData }) {
  const handleChange = (key, value) => {
    setData({
      ...data,
      [key]: value
    });
  };

  const {
    intituleProjet = '',
    dureeEtude = '',
    typeConsentement = '',
    populationCible = '',
    typesDonnees = '',
    prelevement = false,
    typePrelevement = '',
    quantitePrelevement = '',
    sourceFinancement = '',
    programmeEmploiFinancement = ''
  } = data;

  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="intituleProjet">Intitulé du projet</FormLabel>
        <TextField
          id="intituleProjet"
          value={intituleProjet}
          onChange={(e) => handleChange('intituleProjet', e.target.value)}
          fullWidth
        />
      </FormGrid>

      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="dureeEtude">Durée de l'étude</FormLabel>
        <TextField
          id="dureeEtude"
          value={dureeEtude}
          onChange={(e) => handleChange('dureeEtude', e.target.value)}
          fullWidth
        />
      </FormGrid>

      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="typeConsentement">Type de consentement</FormLabel>
        <Select
          id="typeConsentement"
          value={typeConsentement}
          onChange={(e) => handleChange('typeConsentement', e.target.value)}
          fullWidth
        >
          <MenuItem value="Libre et éclairé">Libre et éclairé</MenuItem>
          <MenuItem value="différé">différé</MenuItem>
          <MenuItem value="par procuration">par procuration</MenuItem>
          <MenuItem value="dérogation">dérogation</MenuItem>
        </Select>
      </FormGrid>

      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="populationCible">Population cible</FormLabel>
        <TextField
          id="populationCible"
          value={populationCible}
          onChange={(e) => handleChange('populationCible', e.target.value)}
          fullWidth
        />
      </FormGrid>

      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="typesDonnees">Types de données</FormLabel>
        <TextField
          id="typesDonnees"
          value={typesDonnees}
          onChange={(e) => handleChange('typesDonnees', e.target.value)}
          fullWidth
        />
      </FormGrid>

      <FormGrid item xs={12} md={6}>
        <FormControlLabel
          control={
            <Checkbox
              checked={prelevement}
              onChange={(e) => handleChange('prelevement', e.target.checked)}
            />
          }
          label="Prélèvement"
        />
      </FormGrid>

      {prelevement && (
        <>
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="typePrelevement">Type de prélèvement</FormLabel>
            <TextField
              id="typePrelevement"
              value={typePrelevement}
              onChange={(e) => handleChange('typePrelevement', e.target.value)}
              fullWidth
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="quantitePrelevement">Quantité de prélèvement</FormLabel>
            <TextField
              id="quantitePrelevement"
              value={quantitePrelevement}
              onChange={(e) => handleChange('quantitePrelevement', e.target.value)}
              fullWidth
            />
          </FormGrid>
        </>
      )}

      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="sourceFinancement">Source de financement</FormLabel>
        <TextField
          id="sourceFinancement"
          value={sourceFinancement}
          onChange={(e) => handleChange('sourceFinancement', e.target.value)}
          fullWidth
        />
      </FormGrid>

      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="programmeEmploiFinancement">Programme d’emploi du financement</FormLabel>
        <TextField
          id="programmeEmploiFinancement"
          value={programmeEmploiFinancement}
          onChange={(e) => handleChange('programmeEmploiFinancement', e.target.value)}
          fullWidth
          multiline
        />
      </FormGrid>
    </Grid>
  );
}

export default Step1Create;
