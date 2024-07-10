import React, { useState, useEffect } from 'react';
import { Card, Box, Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SendIcon from '@mui/icons-material/Send';
import Step1Create from './stepsCreateProject/Step1Create';
import Step2Create from './stepsCreateProject/Step2Ceraete';
import Step3Create from './stepsCreateProject/Step3Create';
import axios from 'axios';
import Cookies from 'js-cookie';

const steps = ['Informations du projet', 'Documents', 'Users'];

export function CreateProject() {
  const location = useLocation();
  const isEdit = location.state?.isEdit || false;
  const projectId = location.state?.projectId || null; // Get projectId from state
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [projectData, setProjectData] = useState({
    step1: {
      intituleProjet: '',
      dureeEtude: '',
      typeConsentement: '',
      populationCible: '',
      typesDonnees: '',
      prelevement: false,
      typePrelevement: '',
      quantitePrelevement: '',
      sourceFinancement: '',
      programmeEmploiFinancement: ''
    },
    step2: {
      descriptifProjet: null,
      considerationEthique: null,
      ficheInformationArabe: null,
      ficheInformationFrancais: null,
      ficheConsentementArabe: null,
      ficheConsentementFrancais: null,
      attestationEngagement: null,
      attestationCNDP: null,
      cvInvestigateurPrincipal: null,
      autresDocuments: null
    },
    step3: []
  });
  const navigate = useNavigate();
  const [isStep2Editable, setIsStep2Editable] = useState(false); // State to manage Step 2 editability

  useEffect(() => {
    console.log('useEffect triggered');
    console.log('isEdit:', isEdit);
    console.log('projectId:', projectId);

    if (isEdit && projectId) {
      console.log('Fetching project data for edit mode');
      fetchProjectData(projectId); // Pass the projectId to the fetch function
    }
  }, [isEdit, projectId]);

  const fetchProjectData = async (projectId) => {
    try {
      console.log('Sending GET request to fetch project data');
      const jwtCookie = Cookies.get('jwt'); // Récupérer le JWT depuis les cookies
      if (!jwtCookie) {
        throw new Error('JWT cookie not found');
      }

      const response = await axios.get(`http://localhost:8000/invis/projet/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${jwtCookie}` // Inclure le JWT dans l'en-tête Authorization
        }
      });
      console.log('Fetched project data:', response.data);
      const project = response.data;
      setProjectData({
        step1: {
          intituleProjet: project.intituleProjet || '',
          dureeEtude: project.dureeEtude || '',
          typeConsentement: project.typeConsentement || '',
          populationCible: project.populationCible || '',
          typesDonnees: project.typesDonnees || '',
          prelevement: project.prelevement || false,
          typePrelevement: project.typePrelevement || '',
          quantitePrelevement: project.quantitePrelevement || '',
          sourceFinancement: project.sourceFinancement || '',
          programmeEmploiFinancement: project.programmeEmploiFinancement || ''
        },
        step2: {
          descriptifProjet: project.descriptifProjet || null,
          considerationEthique: project.considerationEthique || null,
          ficheInformationArabe: project.ficheInformationArabe || null,
          ficheInformationFrancais: project.ficheInformationFrancais || null,
          ficheConsentementArabe: project.ficheConsentementArabe || null,
          ficheConsentementFrancais: project.ficheConsentementFrancais || null,
          attestationEngagement: project.attestationEngagement || null,
          attestationCNDP: project.attestationCNDP || null,
          cvInvestigateurPrincipal: project.cvInvestigateurPrincipal || null,
          autresDocuments: project.autresDocuments || null
        },
        step3: project.investigateurs || []
      });

      // Enable Step 2 editing when data is fetched
      setIsStep2Editable(true);
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleReset = () => {
    setActiveStep(0);
    setProjectData({
      step1: {
        intituleProjet: '',
        dureeEtude: '',
        typeConsentement: '',
        populationCible: '',
        typesDonnees: '',
        prelevement: false,
        typePrelevement: '',
        quantitePrelevement: '',
        sourceFinancement: '',
        programmeEmploiFinancement: ''
      },
      step2: {
        descriptifProjet: null,
        considerationEthique: null,
        ficheInformationArabe: null,
        ficheInformationFrancais: null,
        ficheConsentementArabe: null,
        ficheConsentementFrancais: null,
        attestationEngagement: null,
        attestationCNDP: null,
        cvInvestigateurPrincipal: null,
        autresDocuments: null
      },
      step3: []
    });
  };

  const handleSubmit = async () => {
    try {
      const jwtCookie = Cookies.get('jwt');
      if (!jwtCookie) {
        throw new Error('JWT cookie not found');
      }

      // Check if it's an edit and the current step is Step 2
      if (isEdit && activeStep === 1 && !isStep2Editable) {
        console.warn('You can only edit Step 2');
        return;
      }

      const formData = new FormData();
      // Step 1 data
      Object.keys(projectData.step1).forEach(key => formData.append(key, projectData.step1[key]));
      // Step 2 files
      Object.keys(projectData.step2).forEach(key => formData.append(key, projectData.step2[key]));
      // Step 3 investigators
      formData.append('investigateurs', JSON.stringify(projectData.step3));
      console.log(formData);
      const currentDate = new Date();
      formData.append('dateDepot', currentDate.toISOString());
      console.log(formData)
      const response = await axios({
        method: isEdit ? 'put' : 'post',
        url: isEdit ? `http://localhost:8000/invis/${projectId}/edit` : 'http://localhost:8000/invis/creer',
        data: formData,
        headers: {
          'Authorization': `Bearer ${jwtCookie}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      console.log('Data submitted successfully:', response.data);
      navigate('../myprojects');
    } catch (error) {
      console.error('Error submitting project data:', error);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <Box sx={{ width: '95%', padding: 5, borderRadius: 1 }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>
                 terminé
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </>
          ) : (
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>Etape {activeStep + 1}</Typography>
              {activeStep === 0  && (
                <Step1Create
                isEdit={isEdit}
                  data={projectData.step1}
                  setData={(updatedStep1Data) => setProjectData((prevData) => ({
                    ...prevData,
                    step1: updatedStep1Data
                  }))}
                />
              )}
              {activeStep === 1 &&  (
                <Step2Create
                  isEdit={isEdit}
                  data={projectData.step2}
                  setData={(updatedStep2Data) => setProjectData((prevData) => ({
                    ...prevData,
                    step2: updatedStep2Data
                  }))}
                />
              )}
              {activeStep === 2 && (
                <Step3Create
                  isEdit={isEdit}
                  data={projectData.step3}
                  setData={(updatedStep3Data) => setProjectData((prevData) => ({
                    ...prevData,
                    step3: updatedStep3Data
                  }))}
                />
              )}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Précèdent
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep === steps.length - 1 ? (
                  <Button onClick={handleSubmit} endIcon={<SendIcon />}>
                    {isEdit ? 'Modifier' : 'Envoyer'}
                  </Button>
                ) : (
                  <Button onClick={handleNext} endIcon={<ArrowForwardIcon />}>
                    Suivant
                  </Button>
                )}
              </Box>
            </>
          )}
        </Box>
      </Card>
    </div>
  );
}
