import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Input,
  Chip,
  Button
} from "@material-tailwind/react";


import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {
  
  ordersOverviewData,
} from "@/data";
import { useState,useEffect } from "react";
import { CheckCircleIcon, ClockIcon,PencilSquareIcon,EyeIcon ,TrashIcon,MagnifyingGlassIcon,Cog6ToothIcon, UsersIcon, UserGroupIcon  } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import AuthorsTableData from "@/data/authors-table-data";
import ProjectsTabledata from "@/data/projects-table-data";
import Loading from "@/layouts/loading";
import CodeMember from "./generateCode.jsx/CodeMember";
import fetchGenerate from "@/api/Generate";


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ReunionsTableData from "@/data/reunions-table-data";




export function Reunions() {

  // pour dialogue apres click sur le button
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState('');
 

  const [showAlert, setShowAlert] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);


  

  const [selectedValue, setSelectedValue] = useState('');


  
  const [generatedCode, setGeneratedCode] = useState('');
  const {reunions , loader}= ReunionsTableData()


  
  const [filter,setfilter]=React.useState('');

  // const TotalUsers=totalUsers;
  

  const [reunionslist, setReunionslist] = useState('');

  const desiredStatus1= 'revised'; // Replace 'specificRole' with the actual role you want to filter by
  const desiredStatus2 = 'valider';
  const desiredStatus3 = 'revision mineur';
  const desiredStatus4 = 'revision majeur';


  useEffect(() => {
    const reunionsdatanew = reunions.filter(reunion => reunion );
    setReunionslist(reunionsdatanew);
  }, [reunions]);


 


  // search 
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const normalizeString = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };
  // Filtered reunions list based on search term
  const filteredReunions = Array.isArray(reunionslist)
    ? reunionslist.filter((reunion) =>
      normalizeString(reunion.monthYearOfReunion).toLowerCase().includes(normalizeString(searchTerm).toLowerCase())
      )
    : [];

    function statuscolor(status){
      if(status==="nouveau") return "orange"
      if(status==="revisé") return "yellow"
      if(status==="validé") return "green"
       if(status==="corrigé") return "pink"
      if(status==="revision mineur") return "yellow"
      if(status==="revision majeur") return "yellow"


      
      // if(status==="pending") return "red"
      // if(status==="not started") return "blue-gray"
    }
  
    function statusText(status){
      if(status==="revised") return "revisé"
      if(status==="valider") return "validé"
      if(status==="torevised") return "corrigé"
      if(status==="revision mineur") return "revision mineur"
      if(status==="revision majeur") return "revision majeur"

    }
   
  if(loader) return <Loading />

  return (
    <div className="mt-12">



      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <Typography variant="h5" color="blue-gray" className="mb-1">
                Reunions
              </Typography>
            </div>
            <div className="flex items-center justify-between mr-5 gap-4">
            <input
          type="text"
          placeholder="chercher par mois"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded"
        />
              <Link to=".">
                  <IconButton variant="gradient" color="blue">
                    <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                  </IconButton>
              </Link>
            </div>
          </CardHeader>
         
        <CardBody className=" px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["","mois" , "voir"].map(
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
               {filteredReunions
                .map(
                  ({reunionsId,monthYearOfReunion }) => {
                    const className = `py-4 px-5`;
                   

                    return (
                      <tr>
                        <td className={className}>
                          
                          {reunionsId}
                         
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {monthYearOfReunion}
                            </Typography>
                          </div>
                        </td>
                      
                      <td className={className}>
                      <Link to={`../reunion/show/${reunionsId}`}>
                            <IconButton variant="text" color="blue-gray">
                            <EyeIcon className="h-5 w-5 text-black" />
                            </IconButton>
                      </Link>
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
    
                 
                 
    


      

    </div>
  );
}

export default Reunions;
