
import axios from 'axios';
import Cookies from 'js-cookie';

const addComment = async (projetId,comment,fileToComment) => {
  try {
    const jwtCookie = Cookies.get('jwt');
    
    if (jwtCookie) {
        const commentData = {
            projetId: projetId,
            commentaire: comment,
            fileComment:fileToComment
           };
      const response = await axios.post(`http://localhost:8000/comment/add`, commentData , {
        headers: {
          Authorization: `Bearer ${jwtCookie}`,
          
        },
      });

      return response;
    }
  } catch (error) {
    console.error('Error creating user', error);
    
    throw error;
  }
};

export default addComment;
