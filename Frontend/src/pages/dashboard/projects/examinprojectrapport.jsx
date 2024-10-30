import React,{useState,useEffect} from 'react';
import PDFGenerator from '@/auteComponents/report';
import PrintComponent from '@/template/PrintComponent';
import { PDFDownloadLink , BlobProvider} from '@react-pdf/renderer';
import Input from '@material-tailwind/react';
import InvoiceDocument from '@/template/PrintComponent';
import FetchCommentTrue from '@/api/fetchCommentTrue';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import { ajouteRef, ajouteReunion } from '@/api/ValiderRapp';

import {
  Typography,
  CardHeader,
  CardBody,
  IconButton,
  ListItemSuffix,
  ListItem,
  List,
  Button,
  Card} from "@material-tailwind/react"

import MyPDFViewer from '../pdf';
import Loading from '@/layouts/loading';
import AuthorsTableData
 from '@/data/authors-table-data';


const ExaminProjectRapport= () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {comments , loader }= FetchCommentTrue(id);
  const  {
    authorsTableData,
    dataLoaded,
  } = AuthorsTableData("users"); 
  var usersnewdata = Array.isArray(authorsTableData) ? authorsTableData : [];
  
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


  const [isValid, setIsValid] = useState(true);

  

  


     

  const [checkedState, setCheckedState] = useState([]);

  // useEffect to update checkedState when usersnewdata changes
  useEffect(() => {
    // Initialize checkedState with an array filled with false values
    setCheckedState(new Array(usersnewdata.length).fill(false));
  }, [usersnewdata]);


  const handleCheckboxChange = (position) => {
      const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
      );
      setCheckedState(updatedCheckedState);
  };

  const getCheckedItems = () => {

    if (!Array.isArray(usersnewdata)) {
      console.error('usersnewdata is falsy:', usersnewdata);
      return []; // or handle this case according to your application logic
  }
  
      return usersnewdata.filter((user, index) => checkedState[index]);
  };
  console.log(getCheckedItems())

  const [status,setStatus] = React.useState("revision mineur")
  const handleSubmit = async () => {
    try {
      // Assume projetId and userId are available from somewhere
      
      console.log(getCheckedItems());
      // const response = await ajouteRef(id,valueRef);
      const responsee = await ajouteReunion(id,getCheckedItems(),status);
      
      console.log(responsee)
      
      navigate('/admin/home');

      // Handle success (e.g., clear the form, show a success message)
    } catch (error) {
      console.error('Error adding comment:', error);
      // Handle error (e.g., show an error message)
    }
    
  }

 
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  if(loader) return <Loading/>
  return (
    
  <div className="mx-2 mt-8 flex">
    <div className="w-2/5 mt-4">
      <Card >

      <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <Typography variant="h5" color="green" className="mb-1">
                Rapport :
              </Typography>
            </div>   
          </CardHeader>

         


            <List>

                <ListItem  ripple={false} className="py-1 pr-1 pl-4 flex items-center border-b border-gray-200">
                      <h2 className="text-lg font-bold mr-4">Membres </h2>
                      <ListItemSuffix>
                      <div className="flex items-center space-x-4">
                          <IconButton variant="text" color="blue-gray">
                                <h2 className="text-lg font-bold mr-12">Présent</h2>
                          </IconButton>
                          {/* <IconButton variant="text" color="blue-gray">
                                <h2 className="text-lg font-bold mr-2">NV</h2>
                          </IconButton> */}
                      </div>
                      </ListItemSuffix>
                      </ListItem>

                    {/* {commentslist.map(
                      ({id,commentaire,statut}) => {
                        const className = `py-4 px-5`;
                        return( */}

              {usersnewdata.map((user, key) => {
                  
                                  return (
                            <ListItem  key={key} ripple={false} className={`py-1 pr-1 pl-4 flex items-center border-b border-gray-200 `}>
                            {user.nom} {user.prenom}
                            <ListItemSuffix>

                            <div className="flex items-center space-x-4">
                                <IconButton variant="text" color="green">
                                    <div>
                                      
                                      <Checkbox key={key}
                                              {...label}  
                                              color="success" 
                                              checked={checkedState[key]}
                                              onChange={() => handleCheckboxChange(key)}
                                              />
                                      
                                      
                                    </div>

                                </IconButton>
                               
                            </div>
                            </ListItemSuffix>
                            </ListItem>
                                   );
                                  }
                                )}
                        {/* );
                      }
                      )} */}
              </List>

              <div >
              
              </div>
             
              {/* <div className="flex justify-end col-span-6 sm:col-full ml-4 mt-4 mb-4 mr-4">
                        <Button 
                          variant="gradient" 
                          color="green"
                          // disabled={disabledSelection}
                          // onClick={handleSubmit}
                        >
                          Confirmer 
                        </Button>   
                    </div> */}
              
              </Card>

              </div>

              
   

      <div className="mx-2 mt-4 w-2/5">
    <Card>
        <div class="ml-6 mr-6">
                
       

          <CardBody className=" px-0 pt-0 pb-2">
          <div className="flex flex-col ">
                <label htmlFor="outlined-required" className="text-lg font-bold mr-4 mb-6 padding-4 ">
                  type de revision : 
                </label>
                <div className="flex flex-row mb-6 items-center">
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={status}
                  onChange={handleChange}
                >
                  <FormControlLabel value="revision mineur" control={<Radio />} label="revision mineur" />
                  <FormControlLabel value="revision majeur" control={<Radio />} label="revision majeur" />
                </RadioGroup>
                
                </div>
                {!isValid && <span className="text-red-500">Format must be 99/99</span>}
              </div>
                
             
          </CardBody>
        </div>
      </Card> 
      </div>


      <div className=" fixed right-0 bottom-0 mb-8 ml-4 mr-8">
                        <Button 
                          variant="gradient" 
                          color="green"
                          // disabled={disabledSelection}
                          onClick={handleSubmit}
                        >
                          FIN d'Examination
                        </Button>   
                    </div>
      
  </div>
 
  );
};





export default ExaminProjectRapport;