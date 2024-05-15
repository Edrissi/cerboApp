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

export function ShowProject() {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const {projectdata,loader}=ProjectData(id);
 
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  
  const pdfContainerRef = useRef(null);
  const [data,setData] = useState();
  const togglePDFViewer = (dataChosed) => {
    
    
      setData(dataChosed);
      setShowPDFViewer(true);
      pdfContainerRef.current.scrollIntoView({ behavior: 'smooth' });
   
  };
  

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

  const [showDeletePopup, setShowDeletePopup] = React.useState({
    value:false,
    idvalue:null
  }); 
  
  var infosproject=[

    {
      title:"Consideration Ethique",
      value:<button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
      onClick={() => togglePDFViewer(projectdata.descriptifProjet)}> descriptif</button>
    },
    {
      title:"Fiche Information Arabe",
      value:<button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
      onClick={() => togglePDFViewer(projectdata.descriptifProjet)}> fiche d'information en arabe</button>
    },
    {
      title:"fiche information Francais",
      value:<button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
      onClick={() => togglePDFViewer(projectdata.descriptifProjet)}> fiche d'information en francais</button>
    },
    {
      title:"fiche de Consentement Arabe",
      value: <button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
      onClick={() => togglePDFViewer(projectdata.typeConsentment)}> fiche de consentement arabe </button>
    },
    {
      title:"Attestation Engagment",
      value: <button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
      onClick={() => togglePDFViewer(projectdata.descriptifProjet)}> attestation Engagment </button>
    },
    {
      title:"Attestation CNDP",
      value: <button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
      onClick={() => togglePDFViewer(projectdata.descriptifProjet)}> Attestation Cndp </button>
    },
    {
      title:"CV Investigateur Principal",
      value: <button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
      onClick={() => togglePDFViewer(projectdata.descriptifProjet)}> CV invPrincipal </button>
    },
    {
      title:"Autres document",
      value:<button className="text-blue-500 border-b-2 border-blue-500 hover:border-blue-700 hover:text-blue-700"
       onClick={() => convertByteArrayToFile(projectdata.descriptifProjet, 'document.pdf', 'application/pdf')}> AUTRES</button>
    },
    
    
    
   
    
  ];
  
  // var infoInvistigateur=[
  //   {
  //     title:"nom d'invistigateur principal",
  //     value:data.nom
  //   },
  //   {
  //     title:"prenom d'invistigateur principal",
  //     value:data.prenom
  //   },
  //   {
  //     title:"Email",
  //     value:data.email
  //   },
  //   {
  //     title:"Titre",
  //     value:data.investigateur.titre
  //   }
  // ];

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
              key={"invi"} 
              title={"prenom"} 
              data={projectdata.investigateur.prenom} 
              className="w-1/2 mb-1 px-3 py-3" 
            /> 
            <ShowDetails 
              key={"invi"} 
              title={"titre"} 
              data={projectdata.investigateur.titre} 
              className="w-1/2 mb-1 px-3 py-3" 
            /> 
            <ShowDetails 
              key={"invi"} 
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
    
    <div className="pdf-container  mx-20" ref={pdfContainerRef}>
    {showPDFViewer && data!=null &&(<div>
  <div className="pdf-overlay ">
    <iframe src={`${convertByteArrayToFile(data, 'application/pdf')}#toolbar=0`} className="pdf-iframe" title="PDF Viewer"></iframe>
  </div>

      <card>
        <CardBody>
        <textarea
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              rows="4"
              placeholder="Entrer vos commentaires..."
            />

          <div className="flex justify-start">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Ajouter
            </button>
          </div>
        </CardBody>
      </card>
      </div>
    )}
    <div>


    {showPDFViewer && data==null &&(
  <div className="flex items-center justify-between w-full">
    <card>
    <CardBody className="overflow-x-auto px-0 sm:px-6 py-4">
    Aucun fichier pour afficher
    </CardBody>
    </card>
  </div>
    )}
    </div>
</div>


  </div>

  )
}
