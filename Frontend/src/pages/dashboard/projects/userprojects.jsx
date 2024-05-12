import React from 'react';
import { Tooltip, Avatar, Typography, Button, Checkbox, IconButton , Input } from '@material-tailwind/react';

import ListProjects from '@/widgets/cards/listtasks';
import RecentProjects from '@/widgets/cards/recenttasks';
import EndProjects from '@/widgets/cards/endtasks';
import { Project } from '@/widgets/cards/project';

export default function UserProjects() {
  return (
    <div className="flex flex-col items-start gap-8 justify-center mt-2">

    <div class="bg-gray-100 flex items-center justify-center mt-6">
    <div class=" px-6 py-5 bg-white rounded-lg shadow-sm">
      <div class="w-full flex justify-start p-1 mb-4">
        <div class="w-full flex justify-between items-center ">
              <Typography variant="h5" color="blue-gray" className="mb-1">
                My Projects
              </Typography>
              
          </div>
          <div className="flex items-center justify-between mr-5 gap-4 w-80">
                <Input label = "Search" className="" icon={<i className="fas fa-search" />} />
                
            </div>
            </div>
    
       
            <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 md:gap-2" >
              <Project status="in progress" name="E-commerce Platform Development" description="Build and deploy backend for the e-commerce application, including server setup and database integration." />
              <Project status="pending" name="User Feedback Collection System" description="Gather requirements from stakeholders and design a system to collect user feedback for the project." />
              <Project status="completed" name="Mobile App UI Redesign" description="Create visually appealing user interface components for the mobile application, focusing on improving the overall user experience." />
              
              <Project status="in progress" name="E-commerce Platform Enhancement" description="Continue deploying backend for the e-commerce application, optimizing server performance and database efficiency." />
              <Project status="pending" name="Client Meeting Scheduler" description="Schedule and conduct meetings with clients to collect detailed requirements for the upcoming project." />
              <Project status="completed" name="Website Redesign Project" description="Revamp the UI components of the website, ensuring a modern and user-friendly design." />
            </div>
            </div>

    </div>

    </div>
  );
}
