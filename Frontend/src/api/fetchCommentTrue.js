import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const FetchCommentTrue = (id) => {
  const [commentData, setCommentData] = useState({
    comments: [],
    loader: true,
  });

  useEffect(() => {
    
    const getComments = async () => {
      try {
          const jwtCookie = Cookies.get('jwt');
          if (jwtCookie) {
            const response = await axios.get(`http://localhost:8000/comment/allvalide/${id}`, {
              headers: {
                Authorization: `Bearer ${jwtCookie}`,
              },
            });
       
            setCommentData({
              comments: response.data,
              loader: false,
            });
          }

        } catch (error) {
        console.error('Error checking data', error);
        throw error;
        }
    };
    if (id) {
        getComments();
      }
    
  }, [id]);

  return { comments: commentData.comments, loader: commentData.loader };
};




export const FetchRapports = (id) => {
  const [rapportsData, setRapportsData] = useState({
    rapports: [],
    loader: true,
  });

  useEffect(() => {
    
    const getRapports = async () => {
      try {
          const jwtCookie = Cookies.get('jwt');
          if (jwtCookie) {
            const response = await axios.get(`http://localhost:8000/invis/rapports/${id}`, {
              headers: {
                Authorization: `Bearer ${jwtCookie}`,
              },
            });
            console.log(response.data);
            setRapportsData({
              rapports: response.data,
              loader: false,
            });
          }

        } catch (error) {
        console.error('Error checking data', error);
        throw error;
        }
    };
    if (id) {
        getRapports();
      }
    
  }, [id]);

  return { rapports: rapportsData.rapports, loader: rapportsData.loader };
};

export default FetchRapports;






