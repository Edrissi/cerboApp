import axios from 'axios';
import Cookies from 'js-cookie';

const EditData = async (Data,id , Object) => {
  try {
    const jwtCookie = Cookies.get('jwt');
    if (jwtCookie) {
      const response = await axios.put(`http://localhost:8000/api/admin/${Object}/edit/${id}`, Data, {
        headers: {
          Authorization: `Bearer ${jwtCookie}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    }
  } catch (error) {
    console.error('Error editing project', error);
    console.log(error.response)
    throw error;
  }
};
export default EditData;
