import axios from 'axios';
import Cookies from 'js-cookie';

const CreateData = async () => {
  try {
    const jwtCookie = Cookies.get('jwt');
    if (jwtCookie) {
      const response = await axios.post(`http://localhost:8000/admin/gencodemembre`,  {
        headers: {
          Authorization: `Bearer ${jwtCookie}`,
          
        },
      });

      return response.data;
    }
  } catch (error) {
    return response;
  }
};

export default CreateData;
