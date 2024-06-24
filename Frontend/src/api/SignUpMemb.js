import axios from 'axios';
import Cookies from 'js-cookie';


export const membreSignup = async (formData,object) => {
  try {
    // Loop through selectedValues and send PUT requests for each updated comment
    console.log(formData)
  
   
    const response= await axios.post(`http://localhost:8000/auth/register/${object}`, formData);
    
    

    console.log('All statuses updated successfully');
    return response; 

  } catch (error) {
    console.error('Error sending data to backend:', error);
    throw error; 
  }
};