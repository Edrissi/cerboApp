import React,{useState,useRef,useEffect} from "react";
import {  Card } from "@material-tailwind/react";

import Loading from "@/layouts/loading";

import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SendIcon from '@mui/icons-material/Send';
import StepHelloCreate from "./stepsCreateProject/StepExamin";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Navigate } from "react-router-dom";
import ProjectData
 from "@/data/project-data";
import StepExamin from "./stepsCreateProject/StepExamin";


const steps = ["descriptif", 'Consideration ethique', 'Informations AR',"Informations FR","Consentement FR","Consentement FR","Engagement","CNDP","CV","autre"];

export function ExaminStepper({id}) {
  
  const [showMessage, setShowMessage] = useState(true);

  const {projectdata,loader}=ProjectData(id);
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const pdfContainerRef = useRef(null);
  

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  

  const isStepOptional = (step) => {
    return step === 1;
  };
  useEffect(() => {
    window.scrollTo(0, 100); // Scrolls to the top of the page
  }, [activeStep]);

  const isStepSkipped = (step) => {
    return skipped.has(step);
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

  const handleSend = () => {
    navigate('/project/examin/:id/rapport');
  }
    const handleReset = () => {
    setActiveStep(0);
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };



  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState({
    value:false,
    message:null
  });
 
 

  

  

  
  
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#DDDDDE ' : 'white',
      color:'gray',
      outline: 'none',
    }),
  };

  const closepopup=()=>{
      navigate('/admin/projects');
  }

 if(loader) return <Loading/>
  return (


  <div className="mt-2 mb-1 flex flex-col gap-12">
    <div className="mt-2 mb-1 flex flex-col gap-12">
            <Card>
              <Box sx={{ 
                width: '95%',
                padding:5,
                borderRadius: 1
                }}>
                  <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                      const stepProps = {};
                      const labelProps = {};
  
                      return (
                        <Step key={label} {...stepProps}>
                          <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>

                  {activeStep === steps.length ? (
                    <React.Fragment>
                    
                   
                      <Navigate to={`../admin/project/rapport/${id}`}/>
                    </React.Fragment>
                  ) : (
                <React.Fragment>
                  {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                  <Box 
                    sx={{ 
                        flex: '1 1 auto',
                        margin:1,
                        padding:1
                     }} > 
                      { activeStep == 0 && <StepExamin id={id} fileCommented={"Descriptif"} data={projectdata.descriptifProjet} /> }
                      { activeStep == 1 && <StepExamin id={id} fileCommented={"Consideration Ethique"} data={projectdata.considerationEthique}/> }
                      { activeStep == 2 && <StepExamin id={id} fileCommented={"Fiche Information Arabe"} data={projectdata.ficheInformationArabe}/> }
                      { activeStep == 3 && <StepExamin id={id} fileCommented={"Fiche Information Francais"} data={projectdata.ficheInformationsFrancais}/> }
                      { activeStep == 4 && <StepExamin id={id} fileCommented={"fiche Consentement Arabe"} data={projectdata.ficheConsentementArabe}/> }
                      { activeStep == 5 && <StepExamin id={id} fileCommented={"fiche Consentement Francais"} data={projectdata.ficheConsentementFrancais}/> }
                      { activeStep == 6 && <StepExamin id={id} fileCommented={"Attestation Engagement"} data={projectdata.attestationEngagement}/> }
                      { activeStep == 7 && <StepExamin id={id} fileCommented={"attestation CNDP"} data={projectdata.attestationCNDP}/> }
                      { activeStep == 8 && <StepExamin id={id} fileCommented={"CV Investigateur Principale"} data={projectdata.cvInvestigateurPrincipal}/> }
                      { activeStep == 9 && <StepExamin id={id} fileCommented={"Autres documents"} data={projectdata.autresDocuments}/> }
                   

                     </Box>
                  <Box sx={{display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1}}
                    >
                      Precedent
                    </Button>
                    <Box 
                    sx={{flex: '1 1 auto'}} >
                     </Box>
                    <Button onClick={handleNext} endIcon={activeStep === steps.length - 1 ? <SendIcon onclick={handleSend}/> : <ArrowForwardIcon /> }>
                      {activeStep === steps.length - 1 ? 'Generer Le Rapport' : 'Suivant'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Card> 
    </div>

  </div>

  );
}

export default ExaminStepper;