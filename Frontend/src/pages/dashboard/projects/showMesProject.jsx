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
import { CheckCircleIcon, ClockIcon,PencilSquareIcon,EyeIcon ,TrashIcon,MagnifyingGlassIcon,Cog6ToothIcon  } from "@heroicons/react/24/solid";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectData from "@/data/project-data";
import Loading from "@/layouts/loading";
import DeleteData from "@/api/DeleteData";
import SuccessPopup from '@/layouts/SuccessPopup';
import PermissionPopup from '@/layouts/PermissionPopup';
import {convertByteArrayToFile} from '@/api/ConvertArray';
import addComment from '@/api/AddComment';
import CommentInput from './commentInput';

export function ShowMesProject() {
  
  const [showDeletePopup, setShowDeletePopup] = React.useState({
    value:false,
    idvalue:null
  }); 
  const [showSuccessPopup, setShowSuccessPopup] = React.useState({
    value:false,
    message:null
  })
  const [comment, setComment] = useState('');
  const [fileToComment,setFileToComment] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const {projectdata,loader}=ProjectData(id);
  
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
      closepopup()
      setShowSuccessPopup({
        value:true,
        message:'Successfully removed project.'
      });
      setShowDeletePopup({
        value:false,
        message:null 
      })

      // Handle success (e.g., clear the form, show a success message)
    } catch (error) {
      console.error('Error adding comment:', error);
      // Handle error (e.g., show an error message)
    }
    
  }


  const [success,setSuccess] = React.useState({
    value:false,
    message:null
  });

  
  
  var infosproject=[

    {
      title:"Descriptif",
      value:<button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
      onClick={() => togglePDFViewer("Descriptif",projectdata.descriptifProjet)}> descriptif</button>
    },
    {
      title:"Fiche Information Arabe",
      value:<button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
      onClick={() => togglePDFViewer("FicheInfoArabe",projectdata.descriptifProjet)}> fiche d'information en arabe</button>
    },
    {
      title:"fiche information Francais",
      value:<button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
      onClick={() => togglePDFViewer("FicheInfoFr",projectdata.descriptifProjet)}> fiche d'information en francais</button>
    },
    {
      title:"fiche de Consentement Arabe",
      value: <button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
      onClick={() => togglePDFViewer("FicheConstArabe",projectdata.typeConsentment)}> fiche de consentement arabe </button>
    },
    {
      title:"Attestation Engagment",
      value: <button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
      onClick={() => togglePDFViewer("AttesEngagment",projectdata.descriptifProjet)}> attestation Engagment </button>
    },
    {
      title:"Attestation CNDP",
      value: <button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
      onClick={() => togglePDFViewer("CNDP",projectdata.descriptifProjet)}> Attestation Cndp </button>
    },
    {
      title:"CV Investigateur Principal",
      value: <button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
      onClick={() => togglePDFViewer("CvInvestPrinci",projectdata.descriptifProjet)}> CV invPrincipal </button>
    },
    {
      title:"Autres document",
      value:<button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
       onClick={() => convertByteArrayToFile("Autres",projectdata.descriptifProjet, 'document.pdf', 'application/pdf')}> AUTRES</button>
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
          <Typography variant="h5" color="blue-gray" className="mb-1">
            Project Informations
          </Typography>   
          <div className="flex items-center">
            <div className="ml-auto">

            <Link to={`../project/edit/${id}`} className="mx-3">
            
              <Button variant="gradient" color="yellow">
                Edit
              </Button>
            </Link>
             
              {/* <Button 
                onClick={e=>deleteclick(id)}
                variant="gradient" 
                color="red"
              >                  
                Delete
              </Button> */}
              
            </div>
          </div>   
        </div>      
      </CardHeader>
      <div className="py-4 px-2 md:px-5">
      <Typography variant="h5" color="blue" className="mb-4 ml-10">
        Investigateur Principal
      </Typography>
      <div class="flex flex-wrap  mb-5 px-6 md:px-10 border-b-2 ">
          
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
              data={projectdata.investigateur.StructureRecherche} 
              className="w-1/2 mb-1 px-3 py-3" 
            /> 
        
        </div>
    
      </div>
      <CardBody className="overflow-x-auto px-0 sm:px-6 pt-0 pb-2">
       
        <CardBody>
        <thead>
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
                
              </thead>
    </CardBody>
        
        
      </CardBody>
    </Card> 
    
    

  </div>

  )
}
