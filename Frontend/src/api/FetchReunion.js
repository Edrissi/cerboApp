import { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';


export const FetchReunion = (id) => {
    const [reunionData, setReunionData] = useState({
      reunion: [],
      loader: true,
    });
  
    useEffect(() => {
      
      const getReunion = async () => {
        try {
            const jwtCookie = Cookies.get('jwt');
            if (jwtCookie) {
              const response = await axios.get(`http://localhost:8000/user/reunion/${id}`, {
                headers: {
                  Authorization: `Bearer ${jwtCookie}`,
                },
              });
              console.log(response.data);
              setReunionData({
                reunion: response.data,
                loader: false,
              });
            }
  
          } catch (error) {
          console.error('Error checking data', error);
          throw error;
          }
      };
      if (id) {
          getReunion();
        }
      
    }, [id]);
  
    return { reunion: reunionData.reunion, loader: reunionData.loader };
  };
  
  export default FetchReunion;
  
  
  
  
  
  
  