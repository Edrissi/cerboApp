import axios from 'axios';
import Cookies from 'js-cookie';


export const updateCommentStatuses = async (selectedValues) => {
  try {
    // Loop through selectedValues and send PUT requests for each updated comment
    console.log(selectedValues)
    const jwtCookie = Cookies.get('jwt');
    if (jwtCookie) {
    
      const response= axios.put(`http://localhost:8000/comment/update`, selectedValues,{
        headers: {
          Authorization: `Bearer ${jwtCookie}`,
          'Content-Type': 'application/json',
        },
      });
    
    // await Promise.all(updatePromises);

    console.log('All statuses updated successfully');
    return response.data; // Return success flag or data if needed

}

  } catch (error) {
    console.error('Error sending data to backend:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};