import React, { useState } from "react";
import { Card, Box, Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SendIcon from '@mui/icons-material/Send';
import Step1Create from "./stepsCreateProject/Step1Create";
import Step2Create from "./stepsCreateProject/Step2Ceraete";
import Step3Create from "./stepsCreateProject/Step3Create";
import axios from 'axios';
import Cookies from 'js-cookie';

const steps = ["Informations du projet", 'Documents', 'Users'];

function CreateProject() {
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
      ficheInformationArabeFrancais: null,
      ficheConsentementArabeFrancais: null,
      attestationEngagement: null,
      attestationCNDP: null,
      cvInvestigateurPrincipal: null,
      autresDocuments: null
    },
    step3: []
  });
  const navigate = useNavigate();

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
        ficheInformationArabeFrancais: null,
        ficheConsentementArabeFrancais: null,
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
  
      const formData = new FormData();
      // Step 1 data
      Object.keys(projectData.step1).forEach(key => formData.append(key, projectData.step1[key]));
      // Step 2 files
      Object.keys(projectData.step2).forEach(key => formData.append(key, projectData.step2[key]));
      // Step 3 investigators
      formData.append('investigateurs', JSON.stringify(projectData.step3));
  
      // Log FormData entries for debugging
      for (const entry of formData.entries()) {
        console.log(entry);
      }
  
      const response = await axios.post('http://localhost:8000/invis/creer', formData, {
        headers: {
          'Authorization': `Bearer ${jwtCookie}`,
          'Content-Type': 'multipart/form-data'
        },
      });
  
      console.log('Data submitted successfully:', response.data);
      navigate('/success');
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
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </>
          ) : (
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
              {activeStep === 0 && (
                <Step1Create
                  data={projectData.step1}
                  setData={(updatedStep1Data) => setProjectData((prevData) => ({
                    ...prevData,
                    step1: updatedStep1Data
                  }))}
                />
              )}
              {activeStep === 1 && (
                <Step2Create
                  data={projectData.step2}
                  setData={(updatedStep2Data) => setProjectData((prevData) => ({
                    ...prevData,
                    step2: updatedStep2Data
                  }))}
                />
              )}
              {activeStep === 2 && (
                <Step3Create
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
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep === steps.length - 1 ? (
                  <Button onClick={handleSubmit} endIcon={<SendIcon />}>
                    Submit
                  </Button>
                ) : (
                  <Button onClick={handleNext} endIcon={<ArrowForwardIcon />}>
                    Next
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

export default CreateProject;
 





