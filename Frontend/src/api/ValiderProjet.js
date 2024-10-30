import axios from 'axios';
import Cookies from 'js-cookie';

const ValiderProjet = async (id , avisType) => {
  console.log(avisType)
  try {
    const jwtCookie = Cookies.get('jwt');

    if (jwtCookie) {
      const validerData = {
        avis : avisType
      }
      const response = await axios.put(`http://localhost:8000/admin/valider/${id}`, validerData, {
        headers: {
          Authorization: `Bearer ${jwtCookie}`,
          'Content-Type': 'application/json',
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
