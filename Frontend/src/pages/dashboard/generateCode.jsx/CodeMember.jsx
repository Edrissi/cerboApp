  import React,{useState} from 'react';
  import Checkbox from '@mui/material/Checkbox';
  import FormControlLabel from '@mui/material/FormControlLabel';
  import FormLabel from '@mui/material/FormLabel';
  import Grid from '@mui/material/Grid';
  import OutlinedInput from '@mui/material/OutlinedInput';
  import { styled } from '@mui/system';
  import {  MenuItem , Select,InputLabel } from '@mui/material';
  import {Typography} from '@mui/material';
  import {Button} from '@mui/material';

  const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
  }));
  function CodeMember({ onSelectChange ,email,onHandleEmailChange }) {

      

      const [selectedValue, setSelectedValue] = useState('');
    
      const handleChange = (event) => {
        setSelectedValue(event.target.value);
        console.log(selectedValue)
      };
    
      const handleSubmit = () => {
        // Use the selectedValue in your submit logic
        console.log('Selected value:', selectedValue);
        // For example, you can send it to your backend or perform any other action
      };
    
    return (
      <Grid container spacing={3} alignItems="center">
        
        <FormGrid item xs={12} md={12}>
        <Typography variant="h5" color="blue-gray" className="mb-1">
          Génèrer Un code d'inscription
        </Typography>
        </FormGrid>
        <FormGrid item xs={6} md={6}>
          <FormLabel htmlFor="role" required>
            Choisir un rôle
          </FormLabel>
          <Select
            labelId="role"
            id="type-consentement"
            
            onChange={handleChange} 
          >
            <MenuItem value="membre">Membre</MenuItem>
            <MenuItem value="investigateur">Investigateur</MenuItem>
          </Select>
        </FormGrid>
        <FormGrid item xs={6} md={6}>
          <FormLabel htmlFor="Email" required>
            Email
          </FormLabel>
          <OutlinedInput
            id="Email"
            name="Email"
            type="Email"
            placeholder="Email"
            autoComplete="Email"
            required
            value={email}
            onChange={onHandleEmailChange}
          />
          </FormGrid>
        

      </Grid>
      );}
    
  export default CodeMember;
