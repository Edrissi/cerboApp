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
import FetchCommentTrue from '@/api/fetchCommentTrue';
import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectData from "@/data/project-data";
import Loading from "@/layouts/loading";
import DeleteData from "@/api/DeleteData";
import SuccessPopup from '@/layouts/SuccessPopup';
import PermissionPopup from '@/layouts/PermissionPopup';
import {convertByteArrayToFile} from '@/api/ConvertArray';
import addComment from '@/api/AddComment';
import CommentInput from './commentInput';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import InvoiceDocument from '@/template/PrintComponent';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ValiderProjet from '@/api/ValiderProjet';

export function ShowProject(isAdmin) {
 

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
  const {projectdata,loader}=ProjectData(id);
  const [showAlert, setShowAlert] = useState(false)
  
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  
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

  const handleSubmit = async () => {
    try {
      // Assume projetId and userId are available from somewhere
      
      const response = await addComment(id, comment ,fileToComment);
      setComment('')
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      // Handle success (e.g., clear the form, show a success message)
    } catch (error) {
      console.error('Error adding comment:', error);
      // Handle error (e.g., show an error message)
    }
    
  }

// Assuming projectdata is loaded asynchronously


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

  
  
  var infosproject=[

    {
      title:"Descriptif",
      value:projectdata.descriptifProjet,
    }, 
    {
      title:"Consideration Ethique",
      value:projectdata.considerationEthique,
    },
    {
      title:"fiche Information Arabe",
      value:projectdata.ficheInformationArabe,
    },
    {
      title:"fiche Information Francais",
      value:projectdata.ficheInformationFrancais,
    },
    {
      title:"fiche Consentement Arabe",
      value:projectdata.ficheConsentementArabe,
    },
    {
      title:"fiche Consentement Francais",
      value:projectdata.ficheConsentementFrancais,
    },
    {
      title:"Attestation Engagement",
      value:projectdata.attestationEngagement,
    },
    {
      title:"Attestation CNDP",
      value:projectdata.attestationCNDP,
    },
    {
      title:"CV Investigateur Principal",
      value:projectdata.cvInvestigateurPrincipal,
    },
    {
      title:"Autres document",
      value:projectdata.autresDocuments,
    },
    
    
    
   
    
  ];
 

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

  const stepperRef = useRef(null);

  // Function to scroll to the top of the stepper
  const scrollToStepperTop = () => {
    stepperRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const {comments , loading }= FetchCommentTrue(id);

  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
    
  };
  console.log(pdfFile)

  const [successValider, setSuccessValider] = useState(false);

  const handleSubmitValider = async () => {

    try{if (!pdfFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', pdfFile);
    const response = await ValiderProjet(id,formData);
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
  console.log(projectdata.decisionFinal)


  if (loader===true) return <Loading />
  return (
    
    <div className="mt-10 mb-8 flex flex-col gap-12">  
    {showDeletePopup.value && <PermissionPopup id={showDeletePopup.idvalue} closepopup={closesuccesspopup} handleactionDeleteProject={handleDeleteProject} object="project"/>}
    {success.value && <SuccessPopup closepopup={closesuccesspopup} message={success.message}/>}
    <Card>
        <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex items-center justify-between p-4 border-b-2  mb-2"
        >
        <div className="flex items-center justify-between w-full">
          <Typography variant="h5" color="blue-gray" className="mb-1 ml-4">
             {projectdata.intituleProjet} 
          </Typography>   
          <div className="flex items-center">
          {isAdmin.isAdmin && projectdata.statut !== "valider" && (
            <div className="ml-1 mr-4 flex-shrink-0">
                <Button  variant="gradient" onClick={handleClickOpen} color="orange">
                  Valider
                </Button>

                  
                     <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Validation Du Projet "}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText style={{ color: 'black', textIndent: '20px' }} id="alert-dialog-description">
                          <svg style={{ width: '48px', height: '36px', marginRight: '8px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="red" class="size-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                          </svg>

                          Il faut prendre en considération qu'après la validation du projet, <span style={{ color: 'red' }} >ni les membres ni l'administrateur </span>ne seront capables d'accéder aux données de ce projet .
                          </DialogContentText>
                          <input
                            type="file"
                            accept="application/pdf"
                            className="mt-5 p-2 text-lg border-2 border-gray-300 rounded-md bg-gray-100 cursor-pointer hover:border-gray-500 focus:outline-none focus:border-blue-500"
                            onChange={handleFileChange}
                            style={{ marginTop: '20px' }}
                          />
                        </DialogContent>
                        <DialogActions>
                          {successValider ? (<span style={{color:"green",}} > Success ! The page will reload shortly...</span>) :(<>
                          <Button color="white" onClick={handleClose}>Cancel</Button>
                          <Button  color="red"  onClick={handleSubmitValider} autoFocus>
                            VALIDER
                          </Button>
                          </>)
                            }

                        </DialogActions>
                    </Dialog>

            <Link to={`../project/examin/${id}`} className="mx-3">
            
              <Button variant="gradient"  color="green">
                Examiner
              </Button>


            </Link>

            {/* <Link to={`../project/edit/${id}`} className="mx-3">
            
              <Button variant="gradient" color="black">
                Edit
              </Button>
            </Link> */}
{/* 
              <Button 
                onClick={e=>deleteclick(id)}
                variant="gradient" 
                color="red"
              >                  
                Delete
              </Button> */}
              
            </div>
            )}
          </div>   
        </div>      
      </CardHeader>
      <div className="py-4 px-2 md:px-5">
      <Typography variant="h5" color="blue" className="mb-4 ml-10">
        Investigateur Principal
      </Typography>
      <div  class="flex flex-wrap  mb-5 px-6 md:px-10 border-b-2 ">
          
            <ShowDetails 
              key={"invi"} 
              title={"nom "} 
              data={projectdata.investigateur.nom} 
              className="w-1/2 mb-1 px-3 py-3" 
            /> 
            <ShowDetails 
              key={"invi1"} 
              title={"prenom"} 
              data={projectdata.investigateur.prenom} 
              className="w-1/2 mb-1 px-3 py-3" 
            /> 
            <ShowDetails 
              key={"invi2"} 
              title={"titre"} 
              data={projectdata.investigateur.titre} 
              className="w-1/2 mb-1 px-3 py-3" 
            /> 
            <ShowDetails 
              key={"invi3"} 
              title={"structure de recherche"} 
              data={projectdata.investigateur.structureRecherche} 
              className="w-1/2 mb-1 px-3 py-3" 
            /> 
        
        </div>
    
      </div>
      <CardBody className="overflow-x-auto px-0 sm:px-6 pt-0 pb-2">
       
        <CardBody>
        {/* <thead>
                  {infosproject.map(
                    (el) => (
                      <th
                        className="w-1/4 mb-1 px-3 py-3"
                        key={el.title}
                      >
                        <Typography
                          variant="small"
                          className="text-[15px] font-medium uppercase text-blue-gray-400"
                        >
                          {el.value}
                        </Typography>
                      </th>
                    )
                  )}  
                
              </thead> */}
             { (projectdata.statut === "revised") && <div>
                <Typography
                          variant="small"
                          className="text-[20px] font-medium uppercase text-orange-600"
                        >
                          Rapport : 
                        </Typography>
                        <PDFDownloadLink document={<InvoiceDocument commentData={comments} dateOf={projectdata.premiereExamination} dateDepot={projectdata.premiereExamination} invis={projectdata.investigateur.nom +''+ projectdata.investigateur.prenom} intitule={projectdata.intituleProjet}/>} fileName="rapport.pdf">
                          {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : <div className='underline text-blue-600'>Download Rapport</div>
                          }
                        </PDFDownloadLink>

                        </div>
                }

            { (projectdata.statut === "valider") && <div>
                <Typography
                          variant="small"
                          className="text-[20px] font-medium uppercase text-orange-600"
                        >
                          Decision Final : 
                        </Typography>
                        <iframe style={{ maxWidth: 500 , display: 'block', margin: 'auto' }}  src={`${convertByteArrayToFile(projectdata.decisionFinal, 'application/pdf')}#toolbar=0`} className="pdf-iframe" title="PDF Viewer"></iframe>

                        </div>
                }
    </CardBody>
        {/* ndndnd
     new stepper  */}
    <Box> 
      <Stepper ref={stepperRef} activeStep={activeStep} orientation="vertical">
        {infosproject.map((step, index) => (
          <Step key={step.title}>
            <StepLabel
              optional={
                index === 7 ? (
                  <Typography variant="caption">Dernier fichier</Typography>
                ) : null
              }
            >
              {step.title}
            </StepLabel>
            <StepContent>
              <Typography>
                          {step.title}
                         
                          {step.value ? ( 
                            <div className="pdf-overlay">
                              <iframe style={{ maxWidth: 700 , display: 'block', margin: 'auto' }}  src={`${convertByteArrayToFile(step.value, 'application/pdf')}#toolbar=0`} className="pdf-iframe" title="PDF Viewer"></iframe>
                              { (isAdmin.isMember || isAdmin.isAdmin ) &&
                              <div className="mt-4 mx-auto max-w-md bg-white p-4 rounded-lg shadow-md">
                              <card>
                                  <CardBody>
                                  <CommentInput  comment={comment} setComment={setComment} handleSubmit={handleSubmit} />
                                  </CardBody>
                              </card> 
                            </div> }
                              
                            </div>
                            
                          ) : 
                          (
                            <div className="flex items-center justify-between w-full">
                              <card>
                              <CardBody className="overflow-x-auto px-0 sm:px-6 py-4">
                              Aucun fichier pour afficher
                              </CardBody>
                              </card>
                            </div>
                              )}
                            
                          
  
              </Typography>
              <Box className="right-4" sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === infosproject.length - 1 ? 'Terminer' : 'Suivant'}
                  </Button>
                  <Button
                    color="white"
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Précedent
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === infosproject.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>Vous avez terminé tous les Sections - Terminé</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            retour au début 
          </Button>
        </Paper>
      )}
    </Box>
      </CardBody>
    </Card> 
    
    <div className="pdf-container  mx-20" ref={pdfContainerRef}>
    {/* {showPDFViewer && data!=null &&(<div>
  <div className="pdf-overlay " >
    <iframe src={`${convertByteArrayToFile(data, 'application/pdf')}#toolbar=0`} className="pdf-iframe" title="PDF Viewer"></iframe>
  </div>
     
      <card>
        <CardBody>
        <CommentInput comment={comment} setComment={setComment} handleSubmit={handleCommentSubmit} />
        </CardBody>
      </card> 
      </div>
    )} */}
    <div>
      


    
    </div>
</div>

{showAlert && (
                  <div className="fixed bottom-4 right-4 z-50">
                    <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert variant="filled" severity="success" onClose={() => setShowAlert(false)}>
                        Message envoyé avec success 
                      </Alert>
                    </Stack>
                    
                  </div>
              )} 
  </div>

  )
}
