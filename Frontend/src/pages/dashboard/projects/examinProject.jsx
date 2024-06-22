import React from "react";
import {
  Typography,
  Card,
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
  List
} from "@material-tailwind/react";
import { ExaminStepper } from "..";
import { useParams } from 'react-router-dom';

export function ExaminProject() {
    const { id } = useParams();

//   if(dataLoaded) return <Loading />
  return (
    <div className="mt-10 mb-8 flex flex-col gap-12">
      <Card>
        <div class="ml-6 mr-6">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <Typography variant="h5" color="green" className="mb-1">
                Examiner le projet
              </Typography>
            </div>   
          </CardHeader>
        
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <form className="mx-auto max-w-xl ">
              {/* <div class="grid grid-cols-6 gap-6"> */}
                {/* {error && (
                  <div className="col-span-6 sm:col-full mt-4 mb-4">
                    <Alert variant="ghost" className="bg-red-500 bg-opacity-20 text-red-700">
                      <span>{error}</span>
                    </Alert>
                  </div>
                )}
                {success.value && <SuccessPopup closepopup={closepopup} message={success.message}/>} */}
                
                {/* <div class="col-span-6 sm:col-span-3">
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Name
                  </Typography>
                  <Input
                    name="name"
                    
                    size="sm"
                    placeholder="Project Name"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                </div> */}

                

                

                


              
                {/* </div>
               

                <Typography variant="h6" color="blue-gray" className="mb-3 mt-6">
                  Description
                </Typography>             
                <Textarea 
                name="description"
                label="Project Description" 
               
                />  */}

                

              </form>

              <ExaminStepper id={id}/>

            </CardBody>
            </div>
          </Card> 
    </div>
  )
}