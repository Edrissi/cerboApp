import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';

function Step3Create() {
  const [users, setUsers] = useState([{ name: '', email: '' }]);

  const handleAddUser = () => {
    setUsers([...users, { name: '', email: '' }]);
  };

  const handleUserChange = (index, key, value) => {
    const updatedUsers = [...users];
    updatedUsers[index][key] = value;
    setUsers(updatedUsers);
  };

  const handleSubmit = () => {
    // Handle submitting users data
    console.log(users);
  };

  return (
    <Grid container spacing={2}>
      {users.map((user, index) => (
        <Grid item xs={12} md={6} key={index}>
          <TextField
            label="Name"
            value={user.name}
            onChange={(e) => handleUserChange(index, 'name', e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            value={user.email}
            onChange={(e) => handleUserChange(index, 'email', e.target.value)}
            fullWidth
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleAddUser}>Add User</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
      </Grid>
    </Grid>
  );
}

export default Step3Create;
