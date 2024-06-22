import React,{useState} from 'react';
import {
    Typography,
    CardHeader,
    CardBody,
    Input,
    Textarea,
    Option,
    Button,
    Alert,
    IconButton,
    ListItemSuffix,
    ListItem,
    List,
    Card} from "@material-tailwind/react"
import FetchComment from '@/api/FetchComments';
import Radio from '@mui/material/Radio';
import { updateCommentStatuses } from '@/api/UpdateComment';
import Loading from "@/layouts/loading";
import MyPDFViewer from '../../pdf';
import { SnackbarProvider, useSnackbar } from 'notistack';

const StepHelloCreate = ({id,fileCommented}) => {
    const { enqueueSnackbar } = useSnackbar();
    const {comments , loader }= FetchComment(id,fileCommented)
    
    const [selectedValues, setSelectedValues] = useState({});
    const [disabledSelection,setDisabledSelection] = useState(false);


    const handleRadioChange = (itemId, value) => {
      setSelectedValues((prevValues) => ({
        ...prevValues,
        [itemId]: value,
      }));
    };
    console.log(selectedValues)
    var commentsdatanew=comments;
    const [commentslist,setCommentslist]=React.useState([])
    
    React.useEffect(()=>{
        setCommentslist(commentsdatanew)
    },[comments])

    const handleSubmit = async () => {
      try {
        const selectedValuesNew = Object.keys(selectedValues).map(key => ({
          id: parseInt(key),  // Convert key to integer if needed
          statut: selectedValues[key] // Use the boolean value from the original object
        }));
        console.log(selectedValuesNew)
        await updateCommentStatuses(selectedValuesNew);
        setDisabledSelection(true);
        enqueueSnackbar('Validé avec success', { variant: 'success' });
      } catch (error) {
        console.error('Error sending data to backend:', error);
      }
    };
  
    
   

    
      if(loader) return <Loading/>
  return (

   
    <div className='flex justify-center w-full mx-auto my-4'>


      <Card className="mx-2" style={{ width: '60%' }}>
        
          <List>
            <ListItem  ripple={false} className="py-1 pr-1 pl-4 flex items-center border-b border-gray-200">
                        <h2 className="text-lg font-bold mr-4">Commetaire</h2>
                        <ListItemSuffix>
                        <div className="flex items-center space-x-4">
                            <IconButton variant="text" color="blue-gray">
                                  <h2 className="text-lg font-bold mr-2">V</h2>
                            </IconButton>
                            <IconButton variant="text" color="blue-gray">
                                  <h2 className="text-lg font-bold mr-2">NV</h2>
                            </IconButton>
                        </div>
                        </ListItemSuffix>
                        </ListItem>

                {commentslist.map(
                  ({id,commentaire,statut}) => {
                    const className = `py-4 px-5`;
                    return(
                        <ListItem  key={id} ripple={false} className={`py-1 pr-1 pl-4 flex items-center border-b border-gray-200 ${statut ? 'bg-green-100' : ''}`}>
                        {commentaire}
                        <ListItemSuffix>

                        <div className="flex items-center space-x-4">
                            <IconButton variant="text" color="green">
                              <Radio  checked={selectedValues[id] === true}
                                      onChange={() => handleRadioChange(id,true)}   
                                      disabled={disabledSelection}      
                                    />
                            </IconButton>
                            <IconButton variant="text" color="red">
                              <Radio  checked={selectedValues[id] === false}
                                      onChange={() => handleRadioChange(id,false)}
                                      disabled={disabledSelection}         
                                    />
                            </IconButton>
                        </div>
                        </ListItemSuffix>
                        </ListItem>
                    );
                  }
                  )}
          </List>
          <div className="flex justify-end col-span-6 sm:col-full ml-4 mt-4 mb-4 mr-4">
                    <Button 
                      variant="gradient" 
                      color="green"
                      disabled={disabledSelection}
                      onClick={handleSubmit}
                    >
                      Valider 
                    </Button>   
                </div>
                  
      </Card>

      <Card className="mx-2" style={{ width: '40%' }}>
        
      <div><MyPDFViewer/></div>
                  
      </Card>

     

                

    </div>



  );
};

export default StepHelloCreate;