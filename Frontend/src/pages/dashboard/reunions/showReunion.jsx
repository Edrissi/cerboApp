import React,{useState,useRef,useEffect} from 'react'
import {
  Typography,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@material-tailwind/react";
import{ShowDetails} from "@/widgets/layout/ShowDetails";
import { PDFDownloadLink } from '@react-pdf/renderer';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import {  MenuItem , Select,InputLabel } from '@mui/material';

// import FetchCommentTrue from '@/api/fetchCommentTrue';
import FetchRapports from '@/api/fetchCommentTrue';
import { styled } from '@mui/system';
import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectData from "@/data/project-data";
import Loading from "@/layouts/loading";
import DeleteData from "@/api/DeleteData";
import SuccessPopup from '@/layouts/SuccessPopup';
import PermissionPopup from '@/layouts/PermissionPopup';
import {convertByteArrayToFile} from '@/api/ConvertArray';
import addComment from '@/api/AddComment';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import InvoiceDocument from '@/template/PrintComponent';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ValiderProjet from '@/api/ValiderProjet';
import TemplateAvisFinal from '@/template/templateAvisFinal';
import FetchReunion from '@/api/FetchReunion';
import { Reunions } from '..';
import TemplatePvReunion from '@/template/pvReunion';

export function ShowReunion(isAdmin) {
 

  const [showDeletePopup, setShowDeletePopup] = React.useState({
    value:false,
    idvalue:null
  }); 
  const [showSuccessPopup, setShowSuccessPopup] = React.useState({
    value:false,
    message:null
  })
  const [comment, setComment] = useState('');
  const [fileToComment,setFileToComment] = useState('Descriptif');
  const navigate = useNavigate();
  const { id } = useParams();

  const pdfContainerRef = useRef(null);
  const [data,setData] = useState();
  const togglePDFViewer = (nameFile,dataChosed) => {
    
      setFileToComment(nameFile)
      console.log(nameFile);
      setData(dataChosed);
      setShowPDFViewer(true);
      pdfContainerRef.current.scrollIntoView({ behavior: 'smooth' });
     
   
  };
  
   //apres le click sur delete
   const deleteclick=(id)=>{
    setShowDeletePopup({
      value:true,
      idvalue:id
    })
  }
  
  const closepopup=()=>{
    setShowDeletePopup({
      ...showDeletePopup,
      value:false
    })
    setShowSuccessPopup({
      ...showSuccessPopup,
      value:false
    })
  }
  
  
     
  const handleCommentSubmit = () => {
    if (window.confirm('Are you sure you want to submit this comment?')) {
        handleSubmit();
    }
    
    };
  

  const handleSubmit = async () => {
    try {
      // Assume projetId and userId are available from somewhere
      
      const response = await addComment(id, comment ,fileToComment);
      console.log(response.data)

      // Handle success (e.g., clear the form, show a success message)
    } catch (error) {
      console.error('Error adding comment:', error);
      // Handle error (e.g., show an error message)
    }
    
  }




// Access data

  
  // Access data
  
  // setData({nom:projectdata.investigateur.nom,
  //   prenom:projectdata.investigateur.prenom
  // })
 // console.log(projectdata)
  // const datecreatedat = new Date(projectdata.created_at).toLocaleDateString();
  // const dateupdatedat = new Date(projectdata.updated_at).toLocaleDateString();
 
  const [success,setSuccess] = React.useState({
    value:false,
    message:null
  });

 

  const handleDeleteProject = async (id) => {
    try {
      const response = await DeleteData(id,'project');
      setSuccess({
        value:true,
        message:'Successfully removed project.'
      });
      setShowDeletePopup({
        value:false,
        idvalue:null
      })
      
    } catch (error) {
      console.error('Error deleting project', error);
    }
  };

 
  const closesuccesspopup=()=>{
    setShowDeletePopup({
      showDeletePopup,
      value:false
    })
    success.value && navigate(-1)
    setSuccess({
      value:false,
      message:null
    })
    const deleteclick=(id)=>{
      setShowDeletePopup({
        value:true,
        idvalue:id
      })
    }
  }

//   const Members = () => {
//     return (
//       <div className='w-full mb-5 px-9 md:px-10'>
//   <Typography variant="h6" color="blue-gray" className="mb-1 ml-3">
//     Investigateur Principal
//   </Typography>
//   <div className='flex flex-wrap justify-between p-1 w-3/4 ml-20'> 
 
//   <div className='flex flex-col my-2' style={{ alignItems: 'center', width: 'calc(33.33% - 16px)' }}>
//     <span variant="h6" color="blue-gray" className="mb-1 ml-3">Nom: <span style={{ marginLeft: '4px' }}>{projectdata.investigateur.nom}</span></span>
//     <span variant="h6" color="blue-gray" className="mb-1 ml-3">Email: <span style={{ marginLeft: '4px' }}>{projectdata.investigateur.email}</span></span>
//     <span variant="h6" color="blue-gray" className="mb-1 ml-3">Téléphone: <span style={{ marginLeft: '4px' }}>{projectdata.investigateur.telephone}</span></span>
//   </div> 
// </div> 
  
// </div> 
//     );
//   }; 
  // new steppper for test 

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [activeStep, setActiveStep] = React.useState(0);

 

  const handleNext = () => {
   
    scrollToStepperTop();
     
    setActiveStep((prevActiveStep) => {
      const newActiveStep = prevActiveStep + 1;
      const fileName = infosproject[newActiveStep]?.title || 'Unknown file';
      console.log(fileName);
      setFileToComment(fileName);
      return newActiveStep;
    });
    
   
    setComment('');
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      const newActiveStep = prevActiveStep - 1;
      const fileName = infosproject[newActiveStep]?.title || 'Unknown file';
      console.log(fileName);
      return newActiveStep;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  // nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
  
  const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
  }));
  const stepperRef = useRef(null);

  // Function to scroll to the top of the stepper
  const scrollToStepperTop = () => {
    stepperRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const {reunion , loader }= FetchReunion(id);

  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
    
  };
  
  const [successValider, setSuccessValider] = useState(false);

  const handleSubmitValider = async () => {

    try{
      if (selectedValue == "none" ) {
      alert('choisir le type de validation');
      return;
    }

    const response = await ValiderProjet(id,selectedValue);
    setSuccessValider(true);

    setTimeout(() => {
      window.location.reload();
    }, 3000);
    console.log(response.data)
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Failed to submit the form. Please try again.');
  }
    

  };


console.log(Array.isArray(reunion.membresPresents)); 

  if (loader===true) return <Loading />
  return (
    
    <div className="mt-10 mb-8 flex flex-col gap-12">  
  
  <Card>
        <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex items-center justify-between p-4 border-b-2  mb-2"
        >
        <div className="flex items-center justify-between w-full">
          <Typography variant="h5" color="blue-gray" className="mb-1 ml-4">
          reunion le :  {reunion?.date}
          </Typography>
        </div>
        </CardHeader>
        
        <CardBody>
        {reunion?.membresPresents?.length > 0 ? (
        <div><PDFDownloadLink document={<TemplatePvReunion dateSession={reunion.date} dateReunion={reunion.date} membresPresents={reunion.membresPresents} projets={reunion.projets}/>} fileName="pvReunion.pdf">
                          {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : <div className='underline text-blue-600'>PV Reunion</div>
                          }
                        </PDFDownloadLink></div>
        ):<div>en cours ...</div>}

        <Typography variant="h6">Liste des Membres Présents :</Typography>
          <ul>
            {reunion?.membresPresents?.length > 0 ? (
              reunion.membresPresents.map((membre, index) => (
                <li key={index}>
                  - {membre.nom} {membre.prenom}
                </li>
              ))
            ) : (
              <li>Aucun membre n'est présent</li>
            )}
          </ul>
          </CardBody>

          <CardBody>
           
          
        <Typography variant="h6">Liste des Projets examinées:</Typography>
          <ul>
            {reunion?.projets?.length > 0 ? (
              reunion.projets.map((projet, index) => (
                <li key={index}>
                  - <span style={{ color: 'red' }}>{projet.ref} </span>| {projet.intituleProjet} 
                </li>
              ))
            ) : (
              <li>Aucun projet n'est examiné</li>
            )}
          </ul>
          </CardBody>
        </Card>


  </div>

  )
}
