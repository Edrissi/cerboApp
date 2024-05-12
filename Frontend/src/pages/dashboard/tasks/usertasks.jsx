import React from 'react';
import { Tooltip, Avatar, Typography, Button, Checkbox, IconButton , Input } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import ListTasks from '@/widgets/cards/listtasks';
import RecentTasks from '@/widgets/cards/recenttasks';
import EndTasks from '@/widgets/cards/endtasks';
import { Task } from '@/widgets/cards/task';

export default function UserTasks() {
  return (
    <div className="flex flex-col items-start gap-8 justify-center mt-2">

    <div class="bg-gray-100 flex items-center justify-center mt-6">
    <div class=" px-6 py-5 bg-white rounded-lg shadow-sm">
      <div class="w-full flex justify-start p-1 mb-4">
        <div class="w-full flex justify-between items-center ">
              <Typography variant="h5" color="blue-gray" className="mb-1">
                My Tasks
              </Typography>
              
          </div>
          <div className="flex items-center justify-between mr-5 gap-4 w-80">
                <Input label = "Search" className="" icon={<i className="fas fa-search" />} />
                
            </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
                <Task status="in progress" name="Deploying Backend" description="Set up server and database for the e-commerce application." />
                <Task status="pending" name="Gathering Requirements" description="Meet with stakeholders to collect requirements for the Task." />
                <Task status="completed" name="Designing UI Components" description="Create visually appealing user interface components for the application." />
                    
                <Task status="in progress" name="Deploying Backend" description="Set up server and database for the e-commerce application." />
                <Task status="pending" name="Gathering Requirements" description="Meet with stakeholders to collect requirements for the Task." />
                <Task status="completed" name="Designing UI Components" description="Create visually appealing user interface components for the application." />  
            </div>
    </div>
    </div>
      <Typography variant="h5" className='ml-5'>
        Activities
        </Typography>

      <div class=" grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  items-center gap-4 w-[98%] mx-auto">
        
        <EndTasks />
        <RecentTasks />
        <ListTasks />
        </div>


    </div>
  );
}