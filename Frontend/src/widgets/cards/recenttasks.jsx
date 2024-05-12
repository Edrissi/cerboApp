import React from 'react';
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
  } from "@material-tailwind/react";
  import { Typography} from '@material-tailwind/react';


export default function RecentTasks() {
  return (
  <div className="bg-white p-6 rounded-2xl shadow shadow-slate-300 relative" >
        <div class="flex flex-row justify-between items-center">
            <div className="absolute top-[-35px] left-1/2 transform -translate-x-1/2 mt-4">
                <div class="flex items-center w-40 justify-center rounded-md py-2 px-2 bg-gradient-to-br from-blue-600 to-blue-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-plus h-5 w-5 text-white" viewBox="0 0 16 16">
                            <path d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7"/>
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                        </svg>
                        <h4 class="ml-2 text-md font-bold text-white dark:text-white uppercase">Recent Tasks</h4>

                    </div>
                    
                </div>
               
            </div>
        <div
        style={{
            maxHeight: "340px",
            overflow: "hidden",
            marginTop:"10px",
        }}
        >
            <div
                style={{
                maxHeight: "340px",
                overflowY: "auto",
                marginRight: "-17px",
                paddingRight: "17px",
                }}
                >
            <Timeline className="mt-5">
                    <TimelineItem>
                        <TimelineConnector />
                        <TimelineHeader className="h-3">
                        <TimelineIcon />
                        <Typography variant="h6" color="blue-gray" className="mr-2 mb-3 md:mb-0">
                        Admin asign you a task
                        </Typography>
                        <Typography variant="small" className="font-normal text-gray-600">
                        1h
                        </Typography>
                        </TimelineHeader>
                        <TimelineBody className="pb-7">
                        <Typography variant="small" className="font-normal text-gray-600" >
                        Designing systems
                        </Typography>
                        </TimelineBody>
                    </TimelineItem>

                    <TimelineItem>
                            <TimelineConnector />
                            <TimelineHeader className="h-3">
                            <TimelineIcon />
                            <Typography variant="h6" color="blue-gray" className="mr-2">
                            Admin asign you a task
                            </Typography>
                            <Typography variant="small" className="font-normal text-gray-600">
                            1h
                            </Typography>
                            </TimelineHeader>
                            <TimelineBody className="pb-7">
                            <Typography variant="small" className="font-normal text-gray-600" >
                            Creating static website
                            </Typography>
                            </TimelineBody>
                    </TimelineItem>


                    <TimelineItem>
                            <TimelineConnector />
                            <TimelineHeader className="h-3">
                            <TimelineIcon />
                            <Typography variant="h6" color="blue-gray" className="mr-2">
                            Admin asign you a task
                            </Typography>
                            <Typography variant="small" className="font-normal text-gray-600">
                            1h
                            </Typography>
                            </TimelineHeader>
                            <TimelineBody className="pb-7">
                            <Typography variant="small" className="font-normal text-gray-600" >
                            Add Progress Track
                            </Typography>
                            </TimelineBody>
                    </TimelineItem>

                    <TimelineItem>
                            <TimelineConnector />
                            <TimelineHeader className="h-3">
                            <TimelineIcon />
                            <Typography variant="h6" color="blue-gray" className="mr-2">
                            Admin asign you a task
                            </Typography>
                            <Typography variant="small" className="font-normal text-gray-600">
                            1h
                            </Typography>
                            </TimelineHeader>
                            <TimelineBody className="pb-7">
                            <Typography variant="small" className="font-normal text-gray-600" >
                            Add Progress Track
                            </Typography>
                            </TimelineBody>
                    </TimelineItem>


                    <TimelineItem>
                            <TimelineConnector/>
                            <TimelineHeader className="h-3">
                            <TimelineIcon />
                            <Typography variant="h6" color="blue-gray" className="mr-2">
                            Admin asign you a task
                            </Typography>
                            <Typography variant="small" className="font-normal text-gray-600">
                            1h
                            </Typography>
                            </TimelineHeader>
                            <TimelineBody className="pb-7">
                            <Typography variant="small" className="font-normal text-gray-600" >
                            Add Progress Track
                            </Typography>
                            </TimelineBody>
                    </TimelineItem>

                    <TimelineItem>
                            <TimelineConnector/>
                            <TimelineHeader className="h-3">
                            <TimelineIcon />
                            <Typography variant="h6" color="blue-gray" className="mr-2">
                            Admin asign you a task
                            </Typography>
                            <Typography variant="small" className="font-normal text-gray-600">
                            1h
                            </Typography>
                            </TimelineHeader>
                            <TimelineBody className="pb-6">
                            <Typography variant="small" className="font-normal text-gray-600" >
                            Add Progress Track
                            </Typography>
                            </TimelineBody>
                    </TimelineItem>
            </Timeline>

            </div>
        </div>
   </div>
  )
}
