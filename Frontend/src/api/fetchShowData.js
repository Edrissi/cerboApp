import axios from 'axios';
import Cookies from 'js-cookie';

const fetchShowData = async (id) => {
  try {
    const jwtCookie = Cookies.get('jwt');
    if (jwtCookie) {
      const response = await axios.get(`http://localhost:8000/admin/info/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtCookie}`,
        }
      });

      return response; 
      
    } 
  } catch (error) {
    console.error('Error fetching user data', error);
    throw error;
  }
};

export default fetchShowData;
