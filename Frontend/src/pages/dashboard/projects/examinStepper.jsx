import React,{useState,useRef,useEffect} from "react";
import {  Card } from "@material-tailwind/react";

import Loading from "@/layouts/loading";

import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SendIcon from '@mui/icons-material/Send';
import StepHelloCreate from "./stepsCreateProject/StepHelloCreate";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Navigate } from "react-router-dom";
import ProjectData
 from "@/data/project-data";


const steps = ["descr", 'ConsEth', 'fichInfo',"FichCons","attCndp","CV","FichCons","FichCons","attCndp","CV","FichCons"];

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
                      { activeStep == 0 && <StepHelloCreate id={id} fileCommented={"descriptif"} data={projectdata.descriptifProjet} /> }
                      { activeStep == 1 && <StepHelloCreate id={id} fileCommented={"descriptif"} data={projectdata.descriptifProjet}/> }
                      { activeStep == 2 && <StepHelloCreate id={id} fileCommented={"descriptif"} data={projectdata.descriptifProjet}/> }
                      { activeStep == 3 && <StepHelloCreate id={id} fileCommented={"descriptif"} data={projectdata.descriptifProjet}/> }
                      { activeStep == 4 && <StepHelloCreate id={id} fileCommented={"descriptif"} data={projectdata.descriptifProjet}/> }
                      { activeStep == 5 && <StepHelloCreate id={id} fileCommented={"CNDP"} data={projectdata.descriptifProjet}/> }
                      { activeStep == 6 && <StepHelloCreate id={id} fileCommented={"descriptif"} data={projectdata.descriptifProjet}/> }
                      { activeStep == 7 && <StepHelloCreate id={id} fileCommented={"descriptif"} data={projectdata.descriptifProjet}/> }
                      { activeStep == 8 && <StepHelloCreate id={id} fileCommented={"descriptif"} data={projectdata.descriptifProjet}/> }
                      { activeStep == 9 && <StepHelloCreate id={id} fileCommented={"descriptif"} data={projectdata.descriptifProjet}/> }
                      { activeStep == 10 && <StepHelloCreate id={id} fileCommented={"descriptif"} data={projectdata.descriptifProjet}/> }
                      { activeStep == 11 && <StepHelloCreate id={id} fileCommented={"descriptif"} data={projectdata.descriptifProjet}/> }

                      { activeStep == 12 && <StepHelloCreate id={id} fileCommented={"descriptif"} data={projectdata.descriptifProjet}/> }
                      { activeStep == 13 && <StepHelloCreate id={id} fileCommented={"descriptif"} data={projectdata.descriptifProjet}/> }
                      { activeStep == 14 && <StepHelloCreate id={id} fileCommented={"descriptif"} data={projectdata.descriptifProjet}/> }
                      { activeStep == 15 && <StepHelloCreate id={id} fileCommented={"descriptif"} data={projectdata.descriptifProjet}/> }


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