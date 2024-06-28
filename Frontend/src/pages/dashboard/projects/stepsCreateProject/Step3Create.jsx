import React from 'react';
import { Grid, TextField, Button, MenuItem } from '@mui/material';

function Step3Create({ data = [], setData ,isEdit}) {
  const handleAddUser = () => {
    const updatedUsers = [...data, { nom: '', prenom: '', titre: '', email: '', affiliation: '', adresse: '' }];
    setData(updatedUsers);
  };

  const handleUserChange = (index, key, value) => {
    const updatedUsers = [...data];
    updatedUsers[index][key] = value;
    setData(updatedUsers);
    console.log('Updated Step 3 Data:', updatedUsers);
  };

  return (
    <Grid container spacing={2}>
      {data.map((user, index) => (
        <Grid item xs={12} md={6} key={index}>
          <TextField
            disabled={isEdit}
            label="Nom"
            value={user.nom}
            onChange={(e) => handleUserChange(index, 'nom', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            disabled={isEdit}
            label="Prenom"
            value={user.prenom}
            onChange={(e) => handleUserChange(index, 'prenom', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
          disabled={isEdit}
            label="Titre"
            value={user.titre}
            onChange={(e) => handleUserChange(index, 'titre', e.target.value)}
            select
            fullWidth
            margin="normal"
          >
            <MenuItem value="Professeur">Professeur</MenuItem>
            <MenuItem value="Docteur">Docteur</MenuItem>
            <MenuItem value="Doctorant">Doctorant</MenuItem>
            <MenuItem value="Autre">Autre</MenuItem>
          </TextField>
          <TextField
          disabled={isEdit}
            label="Email"
            value={user.email}
            onChange={(e) => handleUserChange(index, 'email', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
          disabled={isEdit}
            label="Affiliation/Structure de recherche"
            value={user.affiliation}
            onChange={(e) => handleUserChange(index, 'affiliation', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
          disabled={isEdit}
            label="Adresse"
            value={user.adresse}
            onChange={(e) => handleUserChange(index, 'adresse', e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleAddUser}>Add User</Button>
      </Grid>
    </Grid>
  );
}

export default Step3Create;
