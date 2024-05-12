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
  Button,
MenuHandler,
MenuList,
MenuItem,
} from "@material-tailwind/react";
import {PencilSquareIcon,EyeIcon ,TrashIcon,MagnifyingGlassIcon,Cog6ToothIcon  } from "@heroicons/react/24/solid";
import { tasksTableData } from "@/data";

import { Link } from "react-router-dom";
import React from "react";

export function TaskTable({ isAuthenticated, user, isAdmin }) {
  const [filter,setfilter]=React.useState('');
  var tasksdatanew=tasksTableData.filter(task=>task.task.toLowerCase().includes(filter.toLowerCase()))
console.log(tasksdatanew)
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {isAdmin && (
        <div className="flex justify-end mr-5">
          <Link to="../task/create" className="ml-2">
            <Button variant="gradient" color="black">
              + New Task
            </Button>
          </Link>
        </div>
      )}
      <Card>
      <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 flex items-center justify-between p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <Typography variant="h5" color="blue-gray" className="mb-1">
              Tasks Table
            </Typography>
          </div>
          <div className="flex items-center justify-between mr-5 gap-4">
              <Input 
                  label="Search By Name" 
                  value={filter}
                  onChange={e=>setfilter(e.target.value)}
                      />
              <Link to=".">
                  <IconButton variant="gradient" color="black">
                    <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                  </IconButton>
              </Link>
            </div>        
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["task","project","author","duration", "status", "manage"].map((el) => (
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
              {tasksdatanew.map(
                ({ task , project , user, duration, status }, key) => {
                  const className = `py-3 px-5 ${
                    key === tasksdatanew.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={task}>
                      <td className={className}>
                        <Typography className="text-sm font-bold text-black">
                          {task}
                        </Typography>
                        
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-bold text-blue-gray-600">
                          {project}
                        </Typography>
                        
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {user}
                        </Typography>
                        
                      </td>
                      
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {duration}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={status ? "green" : "blue-gray"}
                          value={status ? "Completed" : "In Progress"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Menu placement="bottom">
                          <MenuHandler>
                            <IconButton variant="text" color="blue-gray">
                              <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
                            </IconButton>
                          </MenuHandler>
                          <MenuList className="w-max border-0">
                          <Link to="../task/show">
                            <MenuItem className="flex items-center gap-3">
                                <EyeIcon className="h-5 w-5 text-blue-gray-500" />
                              <div>
                                <Typography
                                  variant="small"
                                  color="text-blue-gray-500"
                                  className="font-normal"
                                >
                                  Show
                                </Typography>
                              </div>
                            </MenuItem>
                            </Link>
                            <Link to="../task/edit">
                            <MenuItem className="flex items-center gap-3">
                                <PencilSquareIcon className="h-5 w-5 text-blue-gray-500" />
                              <div>
                                <Typography
                                  variant="small"
                                  color="text-blue-gray-500"
                                  className="font-normal"
                                >
                                  Edit
                                </Typography>
                              </div>
                            </MenuItem>
                            </Link>
                            {isAdmin && (
                            <Link to=".">
                            <MenuItem className="flex items-center gap-3">
                                <TrashIcon className="h-5 w-5 text-blue-gray-500" />
                              <div>
                                <Typography
                                  variant="small"
                                  color="text-blue-gray-500"
                                  className="font-normal"
                                >
                                  Delete
                                </Typography>
                              </div>
                            </MenuItem>
                            </Link>
                            )}
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

export default TaskTable;