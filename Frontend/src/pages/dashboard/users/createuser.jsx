import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Alert,
} from "@material-tailwind/react";
import CreateData from '@/api/CreateData';
import { useNavigate } from 'react-router-dom';
import SuccessPopup from '@/layouts/SuccessPopup';

export function CreateUser() {
  const [userData, setUserData] = useState();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState({
    value:false, 
    message:null
  });
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      
      [name]: value,
    });
  };

  const closepopup=()=>{
    navigate('/admin/users');
  }

  const handleCreateUser = async () => {
    try {
      const createdUser = await CreateData();
      setSuccess({
        value:true,
        message: createdUser
      });
      setError(null);

      setTimeout(() => {
        navigate('/admin/users');
      }, 2000);

    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors);
        setError(errorMessages[0]);
        setSuccess(null);
        console.log(errorMessages[0]);
      } else {
        console.error('Failed to create user:', error);
      }
    }
  };
  

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <div className="ml-6 mr-6">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <Typography variant="h5" color="blue-gray" className="mb-1">
                Create New User
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <form className="mx-auto max-w-xl">
              
              <div className="grid grid-cols-6 gap-6">
              {error && (
              <div className="col-span-6 sm:col-full mt-4 mb-4">
              <Alert variant="ghost" className="bg-red-500 bg-opacity-20 text-red-700">
              <span>{error}</span>
              </Alert>
              </div>
              )}
              {success.value && <SuccessPopup closepopup={closepopup} message={success.message}/>}

              
                <div className="col-span-6 sm:col-span-3">
                  
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    First Name
                  </Typography>
                  <Input
                    size="sm"
                    placeholder="First Name"
                    name="firstname"
                    value={""}
                    onChange={handleChange}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Last Name
                  </Typography>
                  <Input
                    size="sm"
                    placeholder="Last Name"
                    name="lastname"
                    value={"userData.lastname"}
                    onChange={handleChange}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    User Designation
                  </Typography>
                  <Input
                    size="sm"
                    placeholder="Designation"
                    name="designation"
                    value={"userData.designation"}
                    onChange={handleChange}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Phone Number
                  </Typography>
                  <Input
                    size="sm"
                    placeholder="Phone Number"
                    name="phone"
                    value={"userData.phone"}
                    onChange={handleChange}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    User Email
                  </Typography>
                  <Input
                    size="sm"
                    placeholder="Email"
                    name="email"
                    value={"userData.email"}
                    onChange={handleChange}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    User Password
                  </Typography>
                  <Input
                    size="sm"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={"userData.password"}
                    onChange={handleChange}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>

              </div>

              <div className="col-span-6 sm:col-full ml-4 mt-4 mb-4">
                <Button variant="gradient" color="black" onClick={handleCreateUser}>
                  Save
                </Button>
              </div>
              
            </form>
          </CardBody>
        </div>
      </Card>
    </div>
  );
}

export default CreateUser;
