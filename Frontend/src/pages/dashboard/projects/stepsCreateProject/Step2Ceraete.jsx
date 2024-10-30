import React from 'react';
import { Grid,  Tooltip,FormLabel , IconButton} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
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
  };

  // Ensure default values or empty object for data.step2
  const step2Data = data || {};

  const templateFiles = {
    descriptifProjet: 'descriptifProjet.docx',
    considerationEthique: 'considerationEthique.docx',
    ficheInformationFrancais: 'ficheInformationFrancais.docx',
    ficheInformationArabe: 'ficheInformationArabe.docx',
    ficheConsentementFrancais: 'ficheConsentementFrancais.docx',
    ficheConsentementArabe: 'ficheConsentementArabe.docx',
    attestationEngagement: 'attestationEngagement.docx',
    attestationCNDP: 'attestationCNDP.pdf',
   
    
  };

  const handleDownloadTemplate = (name) => {
    const filename = templateFiles[name];
    if (filename) {
      const url = `../../public/modeles/${filename}`;
      window.open(url, '_blank');
    }
  }

  return (
    <Grid container spacing={3}>
      {[
        { label: 'Description du projet', name: 'descriptifProjet' },
        { label: 'Consideration Ethique', name: 'considerationEthique' },
        { label: "Fiche d'informations francais", name: 'ficheInformationArabe' },
        { label: "Fiche d'informations arabe ", name: 'ficheInformationFrancais' },

        { label: 'Fiche de Consentement', name: 'ficheConsentementFrancais' },
        { label: 'Fiche de Consentement', name: 'ficheConsentementArabe' },

        { label: "Attestation d'engagment", name: 'attestationEngagement' },
        { label: 'Attestation CNDP', name: 'attestationCNDP' },
        { label: 'Cv Invistigateur Principal', name: 'cvInvestigateurPrincipal' },
        { label: 'Autres documents', name: 'autresDocuments' }
      ].map(({ label, name }) => (
        <Grid item xs={12} key={name}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={4} md={4}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
          </Grid>
          <Grid item xs={4} md={4}>
            <button variant="contained" onClick={() => handleDownloadTemplate(name)}>
              {name !=="autresDocuments" && ( <span style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}>{name}.docx</span>) }
            </button>
          </Grid>
          <Grid item xs={3} md={3}>
            <div className="flex justify-center">
              <InputFileUpload file={step2Data[name] || null} onFileChange={(file) => handleFileChange(name, file)} />
            </div>
          </Grid>
          <Grid item xs={1} md={1}>
            {name !=="autresDocuments" ? (
              <Tooltip title={`Téléchargez le modèle Word pour ${label} , remplissez-le et convertirez-le en pdf avant de le téléverser.`}>
                <IconButton>
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
            ):(<Tooltip title={"s'il y a d'autres documents, rassemblez-les dans un seul PDF"}>
              <IconButton>
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>)}
            </Grid>
        </Grid>
      </Grid>
      ))}
    </Grid>
  );
}

export default Step2Create;
