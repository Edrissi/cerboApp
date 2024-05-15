import axios from 'axios';
import Cookies from 'js-cookie';

const DeleteData = async (id , object) => {
  try {
    const jwtCookie = Cookies.get('jwt');
    if (jwtCookie) {
      const response = await axios.delete(`http://localhost:8000/admin/${object}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtCookie}`,
        },
      });
      return response.data; 
    } 
  } catch (error) {
    console.error('Error fetching user data', error);
    throw error;
  }
};

export default DeleteData;
