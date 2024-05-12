import React,{useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import {  Switch, TextField,FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));
function Step1Create() {

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleToggle = (event) => {
    setShowInput(event.target.checked);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);

  }
  return (
    <Grid container spacing={3}>
    <FormGrid item xs={12} md={6}>
      <FormLabel htmlFor="first-name" required>
        Intitule Projet
      </FormLabel>
      <OutlinedInput
        id="first-name"
        name="first-name"
        type="name"
        placeholder="Intitule Projet"
        autoComplete="first name"
        required
      />
    </FormGrid>
    <FormGrid item xs={12} md={6}>
      <FormLabel htmlFor="last-name" required>
        Duree de L'etude 
      </FormLabel>
      <OutlinedInput
        id="last-name"
        name="last-name"
        type="last-name"
        placeholder="Duree de l'etude"
        autoComplete="last name"
        required
      />
    </FormGrid>

    <FormGrid item xs={12} md={6}>

  
    <InputLabel id="type-consentement-label">Type de Consentement</InputLabel>
    <Select
      labelId="type-consentement-label"
      id="type-consentement"
    >
      <MenuItem value="valeur4">None</MenuItem>
      <MenuItem value="valeur0">Libre et eclairé</MenuItem>
      <MenuItem value="valeur1">differé</MenuItem>
      <MenuItem value="valeur2">par procuration</MenuItem>
      <MenuItem value="valeur3">dérogation</MenuItem>
    </Select>
  
</FormGrid>
    {/* <FormGrid item xs={12}>
      <FormLabel htmlFor="address1" required>
        Address line 1
      </FormLabel>
      <OutlinedInput
        id="address1"
        name="address1"
        type="address1"
        placeholder="Street name and number"
        autoComplete="shipping address-line1"
        required
      />
    </FormGrid>
    <FormGrid item xs={12}>
      <FormLabel htmlFor="address2">Address line 2</FormLabel>
      <OutlinedInput
        id="address2"
        name="address2"
        type="address2"
        placeholder="Apartment, suite, unit, etc. (optional)"
        autoComplete="shipping address-line2"
        required
      />
    </FormGrid> */}
    <FormGrid item xs={6}>
      <FormLabel htmlFor="city" required>
        Population cible
      </FormLabel>
      <OutlinedInput
        id="city"
        name="city"
        type="city"
        placeholder="Population cible"
        autoComplete="City"
        required
      />
    </FormGrid>
    <FormGrid item xs={6}>
      <FormLabel htmlFor="state" required>
        type de donnees
      </FormLabel>
      <OutlinedInput
        id="state"
        name="state"
        type="state"
        placeholder="type de donnees"
        autoComplete="State"
        required
      />
    </FormGrid>

    <FormGrid item xs={12}>
    <FormLabel htmlFor="state" required>
        Prelevment
      </FormLabel>
    <FormControlLabel
        control={<Switch checked={showInput} onChange={handleToggle} />}
        label={showInput ? 'On' : 'Off'}
      />
    </FormGrid>

    <>
      
        {showInput && ( 
        
          <FormGrid item xs={6}>
          <FormLabel htmlFor="state">
          Type de Prelevment
        </FormLabel>
        <OutlinedInput 
            id="consent-input"
            label="Input"
            value={inputValue}
            onChange={handleInputChange}
            
          />
          </FormGrid>
        
      )} 
  </>

  <>
      
        {showInput && ( 
        
          <FormGrid item xs={6}>
          <FormLabel htmlFor="state" >
          Quantité
        </FormLabel>
        <OutlinedInput 
            id="consent-input"
            label="Input"
            value={inputValue}
            onChange={handleInputChange}
            
          />
          </FormGrid>
        
      )} 
  </>

    <FormGrid item xs={12}>
      <FormLabel htmlFor="address2">Source de Financement</FormLabel>
      <OutlinedInput
        id="address2"
        name="address2"
        type="address2"
        placeholder="Source de financement (si existe)"
        autoComplete="shipping address-line2"
        required
      />
    </FormGrid>
    <FormGrid item xs={12}>
      <FormLabel htmlFor="address2">Plus d'informations pour Source de Financement</FormLabel>
      <OutlinedInput
        id="address2"
        name="address2"
        type="address2"
        placeholder="Source de financement (si existe)"
        autoComplete="shipping address-line2"
        required
      />
    </FormGrid>
    
    
    
  </Grid>
    )}
   
export default Step1Create;
