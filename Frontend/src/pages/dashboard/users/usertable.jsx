import React, { useState,useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Alert,
  Stack
} from "@material-tailwind/react";
import { EyeIcon, TrashIcon, MagnifyingGlassIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Link, Navigate } from "react-router-dom";
import AuthorsTableData from "@/data/authors-table-data";
import Loading from "@/layouts/loading";
import DeleteData from "@/api/DeleteData";
import PermissionPopup from "@/layouts/PermissionPopup";
import SuccessPopup from "@/layouts/SuccessPopup";
import fetchTableData from "@/api/fetchTableData";
import { useLocation } from "react-router-dom";
import { data } from "autoprefixer";
import CodeMember from "../generateCode.jsx/CodeMember";
import fetchGenerate from "@/api/Generate";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export function UserTable({userOrInvis}) {
  
  const [filter, setFilter] = React.useState('');
  const [reloaded, setReloaded] = useState(false);
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



  const [selectedValue, setSelectedValue] = useState('');


  

  const handleEmailChange = (event) => {
    setShowAlertError(false);
    setEmail(event.target.value);
  };


  
  const [showDeletePopup, setShowDeletePopup] = React.useState({
    value:false,
    idvalue:null
  }); 
  const [showSuccessPopup, setShowSuccessPopup] = React.useState({
    value:false,
    message:null
  })
  

  const handleDeleteUser = async (id) => {
    try {
      const response = await DeleteData(id, 'user');
      setShowSuccessPopup({
        value:true,
        message:'Successfully removed user.'
      });
      setShowDeletePopup({
        value:false,
        message:null 
      })

    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const closepopup=()=>{
    setShowDeletePopup({
      ...showDeletePopup,
      value:false
    })
    setShowSuccessPopup({
      ...showSuccessPopup,
      value:false
    });
  }
  const  {
    authorsTableData,
    dataLoaded,
  } = AuthorsTableData(userOrInvis); 
  
  const handleClick = async () => {
    try {
      setOpen(false);
      const response = await fetchGenerate(selectedValue,email);
      const data = await response; // assuming response is JSON
      console.log(data);// assuming data contains the generated code
      setShowAlert(true);
      setEmail('');
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } catch (error) {
      setShowAlertError(true);
      setError(error.response.data)
      setTimeout(() => {
        setShowAlertError(false);
      }, 7000);
      console.error('Error:', error.response.data);
    }
  };
  const handleSelectChange = (value) => {
      
    setSelectedValue(value);
    setShowAlertError(false);
    console.log(selectedValue)
};  
  const deleteclick=(id)=>{
    setShowDeletePopup({
      value:true,
      idvalue:id
    })
  }

  const typeMemb=(userOrInvis)=>{
    if(userOrInvis === "users"){
      return "Membres";
    }
    if(userOrInvis === "invis"){
      return "Investigateurs";
    }
  }

  if (!dataLoaded) {
    return <Loading />;
  }

  var usersnewdata = authorsTableData;
//-----------------

    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">

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
              </div>  

            </div>
          </CardHeader>
          <CardBody className=" px-0 pt-0 pb-2">
          <div className="flex items-center justify-center gap-4">
                  
              
                    
          </div>
          </CardBody>
        </Card>
        {showDeletePopup.value &&<PermissionPopup id={showDeletePopup.idvalue} closepopup={closepopup} handleDelete={handleDeleteUser} object="user" />}
        {showSuccessPopup.value &&<SuccessPopup closepopup={closepopup} message={showSuccessPopup.message}/>}

        {/* <div class="flex justify-end mr-5">
          <Link to="../user/create" class="ml-2">
              <Button variant="gradient" color="blue">
                 + New User 
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
                liste des {typeMemb(userOrInvis)}
              </Typography>
            </div>
            <div className="flex items-center justify-between mr-5 gap-4">
              <Input 
                  label="Search By Name" 
                  value={filter}
                  onChange={e=>setFilter(e.target.value)}
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
                  {["","nom","prenom", "email","dernier reunion","manage"].map((el) => (
                    (userOrInvis ==="invis" && el === "dernier reunion") ? null :
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {usersnewdata?.map((user, key) => {
              const className = `py-3 px-5 ${
              key === authorsTableData.length - 1 ? '' : 'border-b border-blue-gray-50'
              }`;
                    return (
                      <tr key={key}>
                       
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {key+1}
                          </Typography>
                          
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {user.nom}
                          </Typography>
                          
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {user.prenom}
                          </Typography>
                          
                        </td>
                        
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {user.email}
                          </Typography>
                        </td>
                        {(userOrInvis ==="invis" ) ? <></> : 
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {user.lastMeet}
                          </Typography>
                        </td>
                         }
                         
                        <td className={className}>
                          <Menu placement="bottom">
                            <MenuHandler>
                            <IconButton>
                              <i className="fas fa-arrow-right" />
                            </IconButton>
                            </MenuHandler>
                            <MenuList className="w-max border-0">
                            <Link to={`../user/show/${user.userId}`}>
                              <MenuItem className="flex items-center gap-3">
                                <EyeIcon className="h-5 w-5 text-blue-gray-500" />
                                <div>
                                  <Typography
                                    variant="small"
                                    color="text-blue-gray-500"
                                    className="font-normal"
                                  >
                                    Voir
                                  </Typography>
                                </div>
                              </MenuItem>
                            </Link>
                              <MenuItem className="flex items-center gap-3"
                                  onClick={() => deleteclick(user.userId)}

                              >
                                  <TrashIcon className="h-5 w-5 text-blue-gray-500" />
                                <div>
                                  <Typography
                                    variant="small"
                                    color="text-blue-gray-500"
                                    className="font-normal"
                                  >
                                    Supprimer
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
  
  export default UserTable;