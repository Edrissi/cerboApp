import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import fetchTableData from '@/api/fetchTableData';
import { object } from 'prop-types';

const UsersTableData = (object) => {
  const [authorsTableData , setauthorsTableData] = useState({
    users: [],
    loader: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchTableData(object);
        setauthorsTableData({
          users: result,
          loader: false,
        }); 
      } catch (error) {
        console.error('Error fetching data:', error);
        setauthorsTableData({
          users: [],
          loader: false,
        });
      }
    };
    fetchData();
  }, []);
  return { authorsTableData: authorsTableData.users, dataLoaded: authorsTableData.loader };
};

export default UsersTableData;
