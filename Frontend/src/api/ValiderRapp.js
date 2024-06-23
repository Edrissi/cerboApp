import axios from 'axios';
import Cookies from 'js-cookie';


export const ajouteRef = async (id,ref) => {
  try {
    const currentDateTime = new Date();
    const dataFin = { date: currentDateTime , ref:ref };
   
    console.log(dataFin)
    const jwtCookie = Cookies.get('jwt');
    if (jwtCookie) {
    
      const response= axios.put(`http://localhost:8000/admin/projet/ref/${id}`, dataFin ,{
        headers: {
          Authorization: `Bearer ${jwtCookie}`,
          'Content-Type': 'application/json',
        },
      });
    
    // await Promise.all(updatePromises);

    console.log('All statuses updated successfully');
    return response.data; 

}

  } catch (error) {
    console.error('Error sending data to backend:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};



export const ajouteReunion = async (id,members) => {
    try {
      const localDateTime = new Date();
      const year = localDateTime.getFullYear();
      const month = ('0' + (localDateTime.getMonth() + 1)).slice(-2); // Ensure two digits for the month
      const formattedYearMonth = `${year}-${month}`;
      console.log(formattedYearMonth)
      const dataFin = { date: formattedYearMonth , membersPresent:members };

      console.log(dataFin)
      const jwtCookie = Cookies.get('jwt');
      if (jwtCookie) {
      
        const response= axios.put(`http://localhost:8000/admin/Reunion/addprojet/${id}`, dataFin ,{
          headers: {
            Authorization: `Bearer ${jwtCookie}`,
            'Content-Type': 'application/json',
          },
        });
      
      // await Promise.all(updatePromises);
  
      console.log('All statuses updated successfully');
      return response; 
  
  }
  
    } catch (error) {
      console.error('Error sending data to backend:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  };