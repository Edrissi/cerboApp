import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Avatar,
  Tooltip,
  Input,
  Chip,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,

} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import ProjectsTabledata from "@/data/projects-table-data";
import { CheckCircleIcon, ClockIcon,PencilSquareIcon,EyeIcon ,TrashIcon,MagnifyingGlassIcon,Cog6ToothIcon  } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import react from "@heroicons/react";
import axios from "axios";
import Loading from "@/layouts/loading";

import DeleteData from "@/api/DeleteData";
import PermissionPopup from '@/layouts/PermissionPopup';
import SuccessPopup from '@/layouts/SuccessPopup';

export function ProjectTable() {
  const [showDeletePopup, setShowDeletePopup] = React.useState({
    value:false,
    idvalue:null
  }); 
  const [showSuccessPopup, setShowSuccessPopup] = React.useState({
    value:false,
    message:null
  })
  const {projects , loader }= ProjectsTabledata()
  
  const [filter,setfilter]=React.useState('');
  var projectsdatanew=projects;
  const [projectslist,setprojetslist]=React.useState([])
 
  React.useEffect(()=>{
    setprojetslist(projectsdatanew)
  },[projects])

  console.log(projectslist)
  function statuscolor(status){
    if(status=== null) return "orange"
    if(status==="revised") return "yellow" 
    if(status==="valider") return "green"
    // if(status==="not started") return "blue-gray"
  }

  //apres le click sur delete
  const deleteclick=(id)=>{
    setShowDeletePopup({
      value:true,
      idvalue:id
    })
  }

  //fermer une popup
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

  const handleDeleteProject = async (id) => {
    try {
      const response = await DeleteData(id,'project');
      setprojetslist((prevProjects) => prevProjects.filter(project => project.id !== id));
      closepopup()
      setShowSuccessPopup({
        value:true,
        message:'Successfully removed project.'
      })
    } catch (error) {
      console.error('Error deleting project', error);
    }
  };

  
  if(loader) return <Loading/>

return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        {showDeletePopup.value &&<PermissionPopup id={showDeletePopup.idvalue} closepopup={closepopup} handleDelete={handleDeleteProject} object="project" />}
        {showSuccessPopup.value &&<SuccessPopup closepopup={closepopup} message={showSuccessPopup.message}/>}

        {/* <div className="flex justify-end mr-5">
          <Link to="../project/create" className="ml-2">
              <Button variant="gradient" color="black">
                 + New Project 
              </Button>
          </Link>
        </div> */}

        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <Typography variant="h5" color="blue-gray" className="mb-1">
                Projects Table
              </Typography>
            </div>
            <div className="flex items-center justify-between mr-5 gap-4">
              <Input 
                  label="Search By Name" 
                  value={filter}
                  onChange={e=>setfilter(e.target.value)}
                      />
              <Link to=".">
                  <IconButton variant="gradient" color="black">
                    <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                  </IconButton>
              </Link>
            </div>
            
          </CardHeader>
          <CardBody className=" px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["id","intitule projet","durre d'etude", "invistigateur principale","status"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {projectslist.map(
                  (project,index) => {
                    const {id ,intituleProjet,dureeEtude ,investigateur,statut}=project;
                    const className = `py-4 px-5`;
                    
                    return (
                      <tr key={index+1}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {index+1}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {intituleProjet}
                            </Typography>
                          </div>
                        </td>
  
                        <td className={className}>
                          <Typography
                            variant="h4"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {dureeEtude}
                          </Typography>
                        </td>
                   
                        <td className={className}>
                          <Typography
                            variant="h4"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {investigateur.email}
                          </Typography>
                        </td>
                                          
                        {/* <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {reversedstartDate} 
                          </Typography>
                        </td> */}
                  
                        {/* <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {reversedendDate} 
                          </Typography>
                        </td> */}

                        <td className={className}>
                        <Chip
                          variant="gradient"
                          color={statuscolor(statut)}
                          value={statut}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      
                      <td className={className}>
                        
                          <Menu placement="bottom">
                            <MenuHandler>
                              <IconButton variant="text" color="blue-gray">
                                <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
                              </IconButton>
                            </MenuHandler>
                            <MenuList className="w-max border-0">
                                <Link to={`../project/show/${id}`}>
                                  <MenuItem className="flex items-center gap-3">
                                      <EyeIcon className="h-5 w-5 text-blue-gray-500" />
                                    <div>
                                      <Typography
                                        variant="small"
                                        color="text-blue-gray-500"
                                        className="font-normal"
                                      >
                                        Show
                                      </Typography>
                                    </div>
                                  </MenuItem>
                                </Link>

                               
                                  <MenuItem className="flex items-center gap-3"
                                            onClick={e=>deleteclick(id)}>
                                      <TrashIcon className="h-5 w-5 text-blue-gray-500" />
                                    <div>
                                      <Typography
                                        variant="small"
                                        color="text-blue-gray-500"
                                        className="font-normal"
                                      >
                                        Delete
                                      </Typography>
                                    </div>
                                  </MenuItem>
                                
                            </MenuList>
                          </Menu>
                      </td>

                    </tr>
                      
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>  
    </div>

  );
}

export default ProjectTable;