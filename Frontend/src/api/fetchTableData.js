import axios from 'axios';
import Cookies from 'js-cookie';

const fetchTableData = async (object) => {
  try {
    const jwtCookie = Cookies.get('jwt');
    if (jwtCookie) {
      const response = await axios.get(`http://localhost:8000/admin/${object}`, {
        headers: {
          Authorization: `Bearer ${jwtCookie}`,
        },
        
      });
      return response.data; 
    } 
  } catch (error) {
    console.error('Error checking data', error);
    throw error;
  }
};

export default fetchTableData;
