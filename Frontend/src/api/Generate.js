import axios from 'axios';
import Cookies from 'js-cookie';

const fetchGenerate = async (object,email) => {
  const data = { emailUser: email };
  try {
    const jwtCookie = Cookies.get('jwt');
    if (jwtCookie) {
      const response = await axios.post(`http://localhost:8000/admin/gencode/${object}`, data, {
        headers: {
          Authorization: `Bearer ${jwtCookie}`,
        },
      });
      console.log(response.data);
      return response.data; // Assuming you want to return the response data
    } else {
      throw new Error('JWT token not found in cookies.');
    }
  } catch (error) {
    console.error('Error checking authentication', error);
    throw error;
  }
};

export default fetchGenerate;

