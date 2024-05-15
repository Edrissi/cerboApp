import axios from 'axios';
import Cookies from 'js-cookie';

const AdminCheck = (userData) => {
  // Check if userData is available and contains authorities
  if (userData && userData.authorities) {
    // Iterate over the authorities array
    for (const authority of userData.authorities) {
      // Check if the authority is 'ADMIN'
      if (authority.authority === 'ADMIN') {
        return true; // User is an Admin
      }
    }
  }
  return false; // User is not an admin or userData is not available
};
const MembreCheck = (userData) => {
  if (userData && userData.authorities) {
    // Iterate over the authorities array
    for (const authority of userData.authorities) {
      // Check if the authority is 'Membre'
      if (authority.authority === 'USER') {
        return true; // User is an Membre
      }
    }
  }
}
const InvisRole = (userData) => {
  if (userData && userData.authorities) {
    // Iterate over the authorities array
    for (const authority of userData.authorities) {
      // Check if the authority is 'Invistigator'
      if (authority.authority === 'INVISTIGATOR') {
        return true; // User is an Invistigator
      }
    }
  }
}

const fetchUserData = async () => {
  try {
    const jwtCookie = Cookies.get('jwt');
    if (jwtCookie) {
      const response = await axios.get('http://localhost:8000/user/info', {
        headers: {
          Authorization: `Bearer ${jwtCookie}`,
        },
      });

      const userData = response.data;

      return {
        isAuthenticated: true,
        user: userData,
        isAdmin: AdminCheck(userData),
        isMember: MembreCheck(userData),
        isInvistigateur: InvisRole(userData)
      };
    } else {
      return {
        isAuthenticated: false,
        user: null,
        isAdmin: false,
        isMember:false,
        isInvistigateur:false
      };
    }
  } catch (error) {
    console.error('Error checking authentication', error);
    throw error;
  }
};

export default fetchUserData;
