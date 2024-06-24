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

import MyPDFViewer from "./pdf";

import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
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




export function Home() {

  // pour dialogue apres click sur le button
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState('');
  const handleClickOpen = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError('Veuillez entrer une adresse email valide.');
      setShowAlertError(true);
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // -----------------
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);


  

  const handleEmailChange = (event) => {
    setShowAlertError(false);
    setEmail(event.target.value);
  };


  const [selectedValue, setSelectedValue] = useState('');


  
  const [generatedCode, setGeneratedCode] = useState('');
  const {projects , loader}= ProjectsTabledata()


  
  const [filter,setfilter]=React.useState('');
  const handleClick = async () => {
    try {
      setOpen(false);
      const response = await fetchGenerate(selectedValue,email);
      const data = await response; // assuming response is JSON
      console.log(data);
      setGeneratedCode(data); // assuming data contains the generated code
      setShowAlert(true);
      setEmail('');
     
      
      
      
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleSelectChange = (value) => {
      
      setSelectedValue(value);
      setShowAlertError(false);
      console.log(selectedValue)
  };  
  
  // const TotalUsers=totalUsers;
  

  const [projectslist, setProjectslist] = useState('');

  const desiredStatus1= 'revised'; // Replace 'specificRole' with the actual role you want to filter by
  const desiredStatus2 = 'valider';
  useEffect(() => {
    const projectsdatanew = projects.filter(project => project.statut === desiredStatus1 || project.statut === desiredStatus2);
    setProjectslist(projectsdatanew);
  }, [projects]);


 

  // const statisticsCardsData = [
  //   {
  //     icon: UsersIcon,
  //     title: "Total Users",
  //     value: TotalUsers,
  //   },
  //   {
  //     icon: CheckCircleIcon,
  //     title: "Completed Projects",
  //     value:CompletedProjectstotal ,
  //   },
  //   {
  //     icon: ClockIcon,
  //     title: "In Progress Projects",
  //     value: InProgressProjects,
  //   },
  //   {
  //     icon: UserGroupIcon,
  //     title: "Total Project",
  //     value: Totalgrps,
  //   },
  // ];
  
  if(loader) return <Loading />

  return (
    <div className="mt-12">
      {/* <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title} 
            color="gray"
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
          />
        ))}
      </div> */}
       
      <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div className="flex items-center justify-between gap-4 bg-white-100 p-4 rounded-lg">
                <CodeMember  onSelectChange={handleSelectChange} email={email} onHandleEmailChange={handleEmailChange}/>
                <div class="col-span-1 flex justify-end items-center mt-4">
                  
                <Button variant="gradient" color="blue" onClick={handleClickOpen} style={{ marginTop: '60px' }}>
                  Génerer un Code et l'envoyer
                </Button>  

                {showAlertError && (
                  <div className="fixed bottom-4 right-4 z-50">
                    <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert variant="filled" severity="warning" onClose={() => setShowAlertError(false)}>
                        {error} 
                      </Alert>
                    </Stack>
                    
                  </div>
              )}        
                    
                    {/* dialogue afficher apres click sur le button  */}
                    
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Are You Sure That you Want to Send Code Registration ? "}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Ce Code va permet au {email} d'inscrire en tant que {selectedValue}. 
                          confirmer ?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button color="white" onClick={handleClose}>Cancel</Button>
                        <Button  color="blue" onClick={handleClick} autoFocus>
                          envoyer
                        </Button>
                      </DialogActions>
                    </Dialog>
    

                {showAlert && (
                  <div className="fixed bottom-4 right-4 z-50">
                    <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert variant="filled" severity="success" onClose={() => setShowAlert(false)}>
                        Code envoyé avec success 
                      </Alert>
                    </Stack>
                    
                  </div>
              )}      
                {/* <div className="flex flex-col">
                  {generatedCode && <p>Generated Code: {generatedCode}</p>}
                </div> */}
              </div>  

            </div>
          </CardHeader>
          <CardBody className=" px-0 pt-0 pb-2">
          <div className="flex items-center justify-center gap-4">
                  
              
                    
          </div>
          </CardBody>
        </Card>



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
                Projects Examinés
              </Typography>
            </div>
            <div className="flex items-center justify-between mr-5 gap-4">
              <Input 
                  label="Search By Name" 
                  value={filter}
                  onChange={e=>setfilter(e.target.value)}
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
                  {["Ref", "Intitule", "Date Examination" , "rapport" , "Statut" , "show"].map(
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
                {projectslist
                .map(
                  ({id,ref,intituleProjet,date, investigateur ,statut }) => {
                    const className = `py-4 px-5`;
                   

                    return (
                      <tr>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {ref}
                            </Typography>
                          </div>
                        </td>
                                          
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {intituleProjet} 
                          </Typography>
                        </td>
                  
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {date} 
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {date} 
                          </Typography>
                        </td>

                        <td className={className}>
                        <Chip
                          variant="gradient"
                          color={statut=="revised" ?  "orange" : ("valider" ? "green" : "blue-gray")}
                          value={statut}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      
                      <td className={className}>
                      <Link to={`../project/show/${id}`}>
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
                  <div><MyPDFViewer dataUrl={"../../../public/rapport.pdf"}/></div>
                 
                 
    


      

    </div>
  );
}

export default Home;
