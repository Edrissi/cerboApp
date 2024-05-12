import React,{useState} from "react";
import {  Card } from "@material-tailwind/react";
import axios from "axios";
import AuthorsTableData from "@/data/authors-table-data";
import UsersTableData from "@/data/users-data";
import Loading from "@/layouts/loading";
import CreateData from "@/api/CreateData";
import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SendIcon from '@mui/icons-material/Send';
import Step1Create from "./stepsCreateProject/step1create";
import Step2Create from "./stepsCreateProject/Step2Ceraete";
import Step3Create from "./stepsCreateProject/Step3Create";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const steps = ["informations du projet", 'Invistigateurs', 'fichiers necessaires'];

export function CreateProject() {
  
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



  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState({
    value:false,
    message:null
  });
  const { authorsTableData, dataLoaded } = UsersTableData();
  const list=authorsTableData.map(user => ({
    value: user.id,  // Use a unique identifier as the value
    label: `${user.firstname} ${user.lastname}`
  }))
  const [Projectdata,setProjectdata]=React.useState({
    Intitule:'',
    category:'',
    datestart:'',
    dateend:'',
    id1:'',
    id2:'',
    id3:'',
    id4:'',
    description:''
  })
  const [iddata,setiddata]=React.useState([])

 function handleidchange(selectedOptions){

  if (selectedOptions.length <= 4) {

    setiddata(selectedOptions)
    const selectedIds = selectedOptions.map(option => option.value);
    setProjectdata(prevState => ({
      ...prevState,
      id1: selectedIds[0] || '',
      id2: selectedIds[1] || '',
      id3: selectedIds[2] || '',
      id4: selectedIds[3] || ''
    }))
  } 
  console.log(Projectdata)
 }
  const handlechanges=(e)=>{
    const {name,value}=e.target
    setProjectdata({
      ...Projectdata,
      [name]:value
    })
    console.log(value)
  }

  const handlechangeselect=(value,index)=>{
    const x="id"+index
    setProjectdata({
      ...Projectdata,
      [x]:value
    })
  }

  const handlecreateproject =async()=>{
      try{
        const project=await CreateData(Projectdata,'project')
        setError(null)
        setSuccess({
          value:true,
          message:'Successfully added project.'
        }) 
      }

      catch(error){
        if (error.response && error.response.data && error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors);
          setError(errorMessages[0]);
          console.log(errorMessages[0]);
        } else {
          if (!Projectdata.datestart) {
            console.error('Error: Datestart is null');
          }
          console.error('Failed to create project:', error);
        }
      }
  }
  
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

 if(dataLoaded) return <Loading/>
  return (


  <div className="mt-12 mb-8 flex flex-col gap-12">
    <div className="mt-12 mb-8 flex flex-col gap-12">
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
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                      </Box>
                    </React.Fragment>
                  ) : (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                  <Box 
                    sx={{ 
                        flex: '1 1 auto',
                        margin:1,
                        padding:1
                     }} >
                      { activeStep == 0 && <Step1Create /> }
                      { activeStep == 1 && <Step2Create /> }
                      { activeStep == 2 && <Step3Create /> }
                     </Box>
                  <Box sx={{display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1}}
                    >
                      Back
                    </Button>
                    <Box 
                    sx={{flex: '1 1 auto'}} >
                     </Box>
                    <Button onClick={handleNext} endIcon={activeStep === steps.length - 1 ? <SendIcon /> : <ArrowForwardIcon /> }>
                      {activeStep === steps.length - 1 ? 'Send' : 'Next'}
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

export default CreateProject;