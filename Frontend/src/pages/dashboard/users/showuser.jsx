import React from 'react'
import {
  Typography,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@material-tailwind/react";

import fetchShowData from '@/api/fetchShowData';
import { useParams } from 'react-router-dom';
import { useState , useEffect } from 'react';
import Loading from '@/layouts/loading';


export function ShowUser() {

  const [dataLoaded, setDataLoaded] = useState(false);
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchShowData(id);
        setUserData(response.data); 
        setDataLoaded(true);
        console.log(userData)
      } catch (error) {
        console.error('Error fetching user data', error);
        setDataLoaded(true);
      }
    };

    fetchData();
  }, [id]);

  if (!dataLoaded) {
    return <Loading />;
  }

  return (
    <>
     <div className='mt-6'>
        <div class="2xl:col-span-2 dark:border-gray-700 sm:p-3 dark:bg-gray-800 ml-4 mr-4">
        <Typography variant="h5" color="blue-gray" >
                User Informations
        </Typography>
      </div>
    </div>
      <div class="grid grid-cols-1 px-4 pt-4 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
      <div class="col-span-full xl:col-auto"> 
          <div class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <div class="flex flex-col justify-center items-center">
                  {/* <img class="relative mb-4 rounded-full w-48 h-48 sm:mb-0 xl:mb-4 2xl:mb-0" src={userData.img} alt="Jese picture"/> */}
                  <div class="text-center mt-6">
                  <Typography variant="h5" color="blue-gray" >
                  {userData.nom+' '+userData.prenom}
                </Typography>                         
                  </div>
              </div>
              
          </div>
          
      </div>

      <div class="col-span-2">
        <div class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            
            <div className='grid grid-cols-2  grid-rows-7' style={{ gridTemplateColumns: "200px 400px", width: "600px" }}>
                  <Typography variant="h6" color="blue-gray" className="mb-4" > 
                    Email
                  </Typography>
                  <Typography variant="p"  className="mb-4 mr-30" >
                  <a href={`mailto:${userData?.email}`}>{userData?.email}</a>
                  </Typography>

                  <Typography variant="h6" color="blue-gray" className="mb-4 " >
                    Email Secondaire
                  </Typography>
                  <Typography variant="p"  className="mb-4 mr-30" >
                  <a href={`mailto:${userData?.emailSec}`}>{userData?.emailSec}</a>
                  </Typography>
                  
                  <Typography variant="h6" color="blue-gray" className="mb-4 " >
                    Titre
                  </Typography>
                  <Typography variant="p"  className="mb-4 ">
                    {userData.titre}
                  </Typography>

                  <Typography variant="h6" color="blue-gray" className="mb-4 " >
                    Affiliation
                  </Typography>
                  <Typography variant="p"  className="mb-4 ">
                    {userData.affiliation}
                  </Typography>

                  
                  <Typography variant="h6" color="blue-gray" className="mb-4 " >
                    Specialite
                  </Typography>
                  <Typography variant="p"  className="mb-4 ">
                    {userData.specialite}
                  </Typography>

                  <Typography variant="h6" color="blue-gray" className="mb-4 " >
                    adresse
                  </Typography>
                  <Typography variant="p"  className="mb-4 ">
                    {userData.adresse}
                  </Typography>
            </div>
            
        </div>
        
      </div>
    </div> 
</>
  )}