import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  Avatar
} from "@material-tailwind/react";

export function Project({ id , name , description , status }) {
  let icon, bgColor, textColor, iconParent;

  switch (status) {
    case "completed":
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle text-gray-600" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
          <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
        </svg>
      );
      iconParent = (
        <div class="flex justify-center items-center px-3 py-1 text-xs font-bold uppercase text-white bg-gradient-to-br from-green-600 to-green-200 rounded-2xl">
                <svg class="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Done
          </div>

      );

      bgColor = "bg-green-100";
      textColor = "text-green-500";
      break;
    case "in progress":
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bar-chart-line text-gray-600" viewBox="0 0 16 16">
          <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1zm1 12h2V2h-2zm-3 0V7H7v7zm-5 0v-3H2v3z"/>
        </svg>
      );
      bgColor = "bg-blue-100";
      textColor = "text-blue-500";

      iconParent = (
        <div class="flex justify-center items-center px-3 py-1 text-xs font-bold uppercase text-white bg-gradient-to-br from-pink-600 to-pink-100 rounded-2xl">
        <svg class="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
        9 days left
        </div>
      );
      break;
      
    case "pending":
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-circle text-gray-600" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
        </svg>
      );
      bgColor = "bg-red-100";
      textColor = "text-red-500";
      iconParent = (
        <div class="flex justify-center items-center px-3 py-1 text-xs font-bold uppercase text-white bg-gradient-to-br from-pink-600 to-pink-100 rounded-2xl">
        <svg class="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
        9 days left
        </div>
      );
      break;
    case "not started":
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hourglass-top text-gray-600" viewBox="0 0 16 16">
          <path d="M2 14.5a.5.5 0 0 0 .5.5h11a.5.5 0 1 0 0-1h-1v-1a4.5 4.5 0 0 0-2.557-4.06c-.29-.139-.443-.377-.443-.59v-.7c0-.213.154-.451.443-.59A4.5 4.5 0 0 0 12.5 3V2h1a.5.5 0 0 0 0-1h-11a.5.5 0 0 0 0 1h1v1a4.5 4.5 0 0 0 2.557 4.06c.29.139.443.377.443.59v.7c0 .213-.154.451-.443.59A4.5 4.5 0 0 0 3.5 13v1h-1a.5.5 0 0 0-.5.5m2.5-.5v-1a3.5 3.5 0 0 1 1.989-3.158c.533-.256 1.011-.79 1.011-1.491v-.702s.18.101.5.101.5-.1.5-.1v.7c0 .701.478 1.236 1.011 1.492A3.5 3.5 0 0 1 11.5 13v1z"/>
        </svg>
      );
      bgColor = "bg-purple-100";
      textColor = "text-purple-500";
      iconParent = (
        <div class="flex justify-center items-center px-3 text-xs font-bold uppercase text-white bg-gradient-to-br from-pink-500 to-voilet-500 rounded-2xl">
        <svg class="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
        9 days left
        </div>
      );
      break;
    default:
      icon = null;
      bgColor = "";
      textColor = "text-black";
      break;
  }

  return (
    <div class=" bg-white p-6 rounded-md shadow-xl mb-6 border-2 border-gray-100 hover:border-black hover:border-1 transition-colors duration-300">
      <div class="flex items-start justify-start space-x-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event text-gray-600" viewBox="0 0 16 16">
                                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                            </svg>
                                                    
                        <Typography variant="small" className="font-normal text-dark text-gray-600 mb-1">
                        14 Mars - 22 Janvier
                        </Typography>              
                        
        </div>
      <div class="flex justify-between items-center">
        <div class="text-lg font-semibold text-gray-900">{name}</div>
        
      </div>
    
    <div class="flex flex-col">
    <div
        style={{
            maxHeight: "50px",
            overflow: "hidden",
            marginTop:"10px",
        }}
        >
            <div
                style={{
                maxHeight: "50px",
                overflowY: "auto",
                marginRight: "-15px",
                paddingRight: "15px",
                }}
                >
                <p class="text-gray-700">  
                    {description}
                </p>
            </div>
        </div>

        <div
        style={{
            maxHeight: "60px",
            overflow: "hidden",
            marginTop:"10px",
        }}
        >
            <div className=" mb-1"
                style={{
                maxHeight: "60px",
                overflowY: "auto",
                marginRight: "-15px",
                paddingRight: "15px",
                }}
                >
                
                <div class="flex space-x-2 text-gray-500 text-sm mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle h-4 w-4" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                </svg>
                        <p>Design UI landing page</p> 
                </div>
                <div class="flex space-x-2 text-gray-500 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle h-4 w-4" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                </svg>
                      <p>Dynamic sign in page</p> 
                </div>

            </div>
    </div>


        <div className="flex justify-between mt-4 mb-2 ml-4">
          
          <div className="flex justify-end items-center"> 
          <Tooltip content={`Bonnie Green`} placement="bottom">
              <Avatar 
                  src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/bonnie-green.png"                                     
                  size="sm"
                  variant="circular"
                  className={`cursor-pointer border-2 border-white -ml-2.5`}
              />
          </Tooltip>
          <Tooltip content={`Roberta Casas`} placement="bottom">
              <Avatar 
                  src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/roberta-casas.png" 
                  size="sm"
                  variant="circular"
                  className={`cursor-pointer border-2 border-white -ml-2.5`}
              />
          </Tooltip>
          <Tooltip content={`Bonnie Green`} placement="bottom">
              <Avatar 
                  src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/bonnie-green.png"                                     
                  size="sm"
                  variant="circular"
                  className={`cursor-pointer border-2 border-white -ml-2.5`}
              />
          </Tooltip>
          <Tooltip content={`Roberta Casas`} placement="bottom">
              <Avatar 
                  src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/roberta-casas.png" 
                  size="sm"
                  variant="circular"
                  className={`cursor-pointer border-2 border-white -ml-2.5`}
              />
          </Tooltip>
          </div>
          
  </div>

        
    </div>
    
</div>



  );
}
