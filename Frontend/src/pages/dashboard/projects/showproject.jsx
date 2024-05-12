import React from 'react'
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
import {convertByteArrayToPdf} from '@/api/ConvertArray';

export function ShowProject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {projectdata,loader}=ProjectData(id);
  // const datecreatedat = new Date(projectdata.created_at).toLocaleDateString();
  // const dateupdatedat = new Date(projectdata.updated_at).toLocaleDateString();
  console.log(projectdata)
  const [success,setSuccess] = React.useState({
    value:false,
    message:null
  });
  const [showDeletePopup, setShowDeletePopup] = React.useState({
    value:false,
    idvalue:null
  }); 
  
  var infosproject=[
    {
      title:"Project Name",
      value:projectdata.intituleProjet
    },
    {
      title:"Duree d'etude",
      value:projectdata.dureeEtude
    },
    {
      title:"Type Consentement",
      value:projectdata.typeConsentment
    },
    {
      title:"Population Cible",
      value:projectdata.populationCible
    },
    {
      title:"Source de financement",
      value:projectdata.sourceFinancement
    },
    {
      title:"Consideration Ethique",
      value:<button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
       onClick={() => convertByteArrayToPdf(projectdata.descriptifProjet, `descriptif.pdf`)}> descriptif.pdf</button>
    },
    {
      title:"Fiche Information Arabe",
      value:<button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
       onClick={() => convertByteArrayToPdf(projectdata.descriptifProjet, `descriptif.pdf`)}> descriptif.pdf</button>
    },
    {
      title:"fiche information Francais",
      value:<button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
       onClick={() => convertByteArrayToPdf(projectdata.descriptifProjet, `descriptif.pdf`)}> descriptif.pdf</button>
    },
    {
      title:"fiche de Consentement Arabe",
      value:<button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
       onClick={() => convertByteArrayToPdf(projectdata.descriptifProjet, `descriptif.pdf`)}> descriptif.pdf</button>
    },
    {
      title:"Attestation Engagment",
      value:<button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
       onClick={() => convertByteArrayToPdf(projectdata.descriptifProjet, `descriptif.pdf`)}> descriptif.pdf</button>
    },
    {
      title:"Attestation CNDP",
      value:<button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
       onClick={() => convertByteArrayToPdf(projectdata.descriptifProjet, `descriptif.pdf`)}> descriptif.pdf</button>
    },
    {
      title:"CV Investigateur Principal",
      value:<button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
       onClick={() => convertByteArrayToPdf(projectdata.descriptifProjet, `descriptif.pdf`)}> descriptif.pdf</button>
    },
    {
      title:"Autres document",
      value:<button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
       onClick={() => convertByteArrayToPdf(projectdata.descriptifProjet, `descriptif.pdf`)}> descriptif.pdf</button>
    }
    
   
    
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

  const deleteclick=(id)=>{
    setShowDeletePopup({
      value:true,
      idvalue:id
    })
  }
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
  }

  const Members = () => {
    return (
      <div className='w-full mb-5 px-9 md:px-10'>
        <Typography variant="h6" color="blue-gray" className="mb-1 ml-3">
          Invistigateur Principale
        </Typography>
        {/* <ul className='flex flex-wrap justify-between p-1 w-3/4  ml-20'> */}
          {/* {projectdata.investigateur.map(member => 
            <li key={member.id} className='flex flex-col my-2 ' style={{ alignItems: 'center' }}> */}
              {/* <Avatar
                    src={member.img} 
                    alt={member.lastname} 
                    size="lg"
                    variant="circular"
                    className='m-2 justify-center'
                  /> */}
              <span variant="h6" color="blue-gray" className="mb-1 ml-3"> {projectdata.investigateur.nom}</span>
            {/* </li> */}
          {/* )} */}
        {/* </ul> */}
      </div>
    );
  }; 

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
        className="flex items-center justify-between p-4 border-b-2 mb-2"
        >
        <div className="flex items-center justify-between w-full">
          <Typography variant="h5" color="blue-gray" className="mb-1">
            Project Informations
          </Typography>   
          <div className="flex items-center">
            <div className="ml-auto">
              <Link to={`../project/edit/${id}`} className="mx-3">
                <Button variant="gradient" color="black">
                  Edit
                </Button>
              </Link>
              
              <Button 
                onClick={e=>deleteclick(id)}
                variant="gradient" 
                color="red"
              >                  
                Delete
              </Button>
              
            </div>
          </div>   
        </div>      
      </CardHeader>

      <CardBody className="overflow-x-auto px-0 sm:px-6 py-4">
        <div class="flex flex-wrap  mb-5 px-6 md:px-10">
          {infosproject.map(e=>
            <ShowDetails 
              key={e.title} 
              title={e.title} 
              data={e.value} 
              className="w-1/2 mb-1 px-3 py-3" 
            /> 
          )}
        </div>
        <Members/>
      </CardBody>
    </Card> 
  </div>
  )
}
