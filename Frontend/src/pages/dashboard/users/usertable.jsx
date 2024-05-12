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
  Alert
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

export function UserTable({userOrInvis}) {
  
  const [filter, setFilter] = React.useState('');
  const [reloaded, setReloaded] = useState(false);

  
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
  
  
  // const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  //   return (
  //     <div className="flex justify-end">
  //     <button
  //         disabled={currentPage === 1}
  //         className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
  //         onClick={() => onPageChange(currentPage - 1)}
  //       >
  //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
  //           aria-hidden="true" className="w-4 h-4">
  //           <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
  //         </svg>
  //         Previous
  //       </button>
        
  //       <div className="flex items-center gap-2">
  //         {[...Array(totalPages).keys()].map((index) => (
  //           <button
  //             key={index}
  //             onClick={() => onPageChange(index + 1)}
  //             className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg ${
  //               index + 1 === currentPage
  //                 ? 'bg-gray-900 text-white shadow-md shadow-gray-900/10'
  //                 : 'text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20'
  //             } transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
  //             type="button"
  //           >
  //             <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
  //               {index + 1}
  //             </span>
  //           </button>
  //         ))}
  //       </div>
  
  //       <button
  //         disabled={currentPage === totalPages}
  //         className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
  //         onClick={() => onPageChange(currentPage + 1)}
  //       >
  //         Next
  //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
  //           aria-hidden="true" className="w-4 h-4">
  //           <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
  //         </svg>
  //       </button>
  //     </div>
  //   );
  // };
  
  const deleteclick=(id)=>{
    setShowDeletePopup({
      value:true,
      idvalue:id
    })
  }

  if (!dataLoaded) {
    return <Loading />;
  }

  var usersnewdata = authorsTableData;
//-----------------

    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
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
                Users Table
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
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["user","email", "prenom", "manage"].map((el) => (
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
                          <div className="flex items-center gap-4">
                            
                            <div>
                              <Typography variant="small" color="blue-gray" className="font-semibold">
                                {` ${user.nom}`}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">{user.email}</Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {user.email}
                          </Typography>
                          
                        </td>
                        
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {user.prenom}
                          </Typography>
                        </td>
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
                                    Show
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
                                    Delete
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