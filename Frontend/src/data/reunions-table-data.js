import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ReunionsTableData = () => {
  const [reunionsData, setReunionsData] = useState({
    reunions: [],
    loader: true,
  });

  useEffect(() => {
    const getReunions = async () => {
      try {
          const jwtCookie = Cookies.get('jwt');
          if (jwtCookie) {
            const response = await axios.get("http://localhost:8000/user/reunions", {
              headers: {
                Authorization: `Bearer ${jwtCookie}`,
              },
            });
            setReunionsData({
              reunions: response.data,
              loader: false,
            });
          }

        } catch (error) {
        console.error('Error checking data', error);
        throw error;
        }
    };

    getReunions();
  }, []);

  return { reunions: reunionsData.reunions, loader: reunionsData.loader };
};

export default ReunionsTableData;
