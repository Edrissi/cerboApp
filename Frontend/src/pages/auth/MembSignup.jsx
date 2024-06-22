import { useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const defaultTheme = createTheme();

export default function MembSignup() {
  const [formValues, setFormValues] = useState({
    nom: '',
    prenom: '',
    titre: '',
    specialite: '',
    email: '',
    password: '',
    confirmPassword: '',
    codeRegistration: '',
    affilliation: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCodeRegistration, setShowCodeRegistration] = useState(false);



  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const validateForm = () => {
    const errors = {};

    if (!formValues.nom) errors.nom = 'First Name is required';
    if (!formValues.prenom) errors.prenom = 'Last Name is required';
    if (!formValues.titre) errors.titre = 'Titre is required';
    if (!formValues.specialite) errors.specialite = 'Spécialité is required';
    if (!formValues.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formValues.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formValues.password) {
      errors.password = 'Password is required';
    } else if (formValues.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    if (!formValues.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (formValues.confirmPassword !== formValues.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!formValues.codeRegistration) errors.codeRegistration = 'Code Registration is required';
    if (!formValues.affilliation) errors.affilliation = 'Affilliation is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
        const data = new FormData(event.currentTarget);
        const formData = {
            email: data.get('email'),
            password: data.get('password'),
            nom: data.get('nom'),
            prenom: data.get('prenom'),
            titre: data.get('titre'),
            specialite: data.get('specialite'),
            codeRegistration: data.get('codeRegistration'),
            affilliation: data.get('affilliation'),
        };
        console.log(formData); // Affiche les données du formulaire dans la console du navigateur

        // Faites la requête POST au backend pour l'inscription
        axios.post('http://localhost:8000/auth/register/memb', formData)
            .then(response => {
              console.log('Inscription réussie:', response.data);
              setSnackMessage('Sign up successful');
              setSnackOpen(true);
              setTimeout(() => {
                window.location.href = '/signin'; // Redirection après deux secondes
              }, 2000);
            })
            .catch(error => {
                console.error('Erreur lors de l\'inscription:', error.response ? error.response.data : error.message);
                // Gérer les erreurs (par exemple, afficher un message d'erreur à l'utilisateur)
            });
    } else {
        setSnackMessage('Please fix the errors in the form');
        setSnackOpen(true);
    }
};


  const handleCloseSnack = () => {
    setSnackOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          backgroundImage: 'url(/src/assets/Singup.jpeg)', // Remplacez l'URL par l'URL de votre image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Container component="main" maxWidth="sm" sx={{ backgroundColor: '#eff6ff', opacity: '0.95', boxShadow: 6, borderRadius: 3, padding: 1, marginTop: 6, marginBottom: 6 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 6, color: '#000080' }}>
              Espace Member 
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="nom"
                    required
                    fullWidth
                    id="nom"
                    label="First Name"
                    autoFocus
                    value={formValues.nom}
                    onChange={handleChange}
                    error={!!formErrors.nom}
                    helperText={formErrors.nom}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="prenom"
                    label="Last Name"
                    name="prenom"
                    autoComplete="family-name"
                    value={formValues.prenom}
                    onChange={handleChange}
                    error={!!formErrors.prenom}
                    helperText={formErrors.prenom}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ width: '100%' }} error={!!formErrors.titre}>
                    <InputLabel id="titre-label">Titre</InputLabel>
                    <Select
                      labelId="titre-label"
                      id="titre"
                      name="titre"
                      value={formValues.titre}
                      onChange={handleChange}
                      autoComplete="titre"
                      sx={{ width: '100%' }}
                    >
                      <MenuItem value="Doctorant">Doctorant</MenuItem>
                      <MenuItem value="Docteur">Docteur</MenuItem>
                      <MenuItem value="Professeur">Professeur</MenuItem>
                      <MenuItem value="Autre">Autre</MenuItem>
                    </Select>
                    {formErrors.titre && <Alert severity="error">{formErrors.titre}</Alert>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ width: '100%' }} error={!!formErrors.specialite}>
                    <InputLabel id="specialite-label">Spécialité</InputLabel>
                    <Select
                      labelId="specialite-label"
                      id="specialite"
                      name="specialite"
                      value={formValues.specialite}
                      onChange={handleChange}
                      autoComplete="specialite"
                      sx={{ width: '100%' }}
                    >
                      <MenuItem value="Cardiaque">Cardiaque</MenuItem>
                      <MenuItem value="Tromato">Tromato</MenuItem>
                    </Select>
                    {formErrors.specialite && <Alert severity="error">{formErrors.specialite}</Alert>}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formValues.email}
                    onChange={handleChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                    value={formValues.password}
                    onChange={handleChange}
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    sx={{ width: '100%' }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={formValues.confirmPassword}
                    onChange={handleChange}
                    error={!!formErrors.confirmPassword}
                    helperText={formErrors.confirmPassword}
                    sx={{ width: '100%' }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="codeRegistration"
                    label="Code Registration"
                    type={showCodeRegistration ? 'text' : 'password'}
                    id="codeRegistration"
                    autoComplete="code-registration"
                    value={formValues.codeRegistration}
                    onChange={handleChange}
                    error={!!formErrors.codeRegistration}
                    helperText={formErrors.codeRegistration}
                    sx={{ width: '100%' }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowCodeRegistration(!showCodeRegistration)}
                            edge="end"
                          >
                            {showCodeRegistration ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="affilliation"
                    label="Affiliation / Structure de recherche"
                    id="affilliation"
                    autoComplete="affilliation"
                    value={formValues.affilliation}
                    onChange={handleChange}
                    error={!!formErrors.affilliation}
                    helperText={formErrors.affilliation}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="Accept all agreements" color="primary" />}
                    label="Accept all agreements"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end" sx={{ mb: 6 }}>
                <Grid item>
                  <Link  href="../../signin" variant="body2" >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Snackbar
            open={snackOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnack}
          >
            <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
              {snackMessage}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </ThemeProvider >
  );
}
