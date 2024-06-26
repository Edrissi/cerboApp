import axios from 'axios';
import Cookies from 'js-cookie';

const ValiderProjet = async (id , formData) => {
  try {
    const jwtCookie = Cookies.get('jwt');
    if (jwtCookie) {
      const response = await axios.put(`http://localhost:8000/admin/valider/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${jwtCookie}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response; 
    } 
  } catch (error) {
    console.error('Error uploading file:', error);
    alert('Failed to upload file.');
    throw error;
  }
};

export default ValiderProjet;
