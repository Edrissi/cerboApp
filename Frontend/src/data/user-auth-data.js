import { useState, useEffect } from "react";
import fetchUserData from "@/api/fetchUserData";

export default function UserAuthData() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const { isAuthenticated, user, isAdmin } = await fetchUserData();
        setIsAuthenticated(isAuthenticated);
        setUser(user);
        setIsAdmin(isAdmin);
        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching user data', error);
        setIsAuthenticated(false);
        setUser(null);
        setIsAdmin(false);
        setDataLoaded(true);
      }
    };

    fetchAuthUser();
  }, []);

  return {
    isAuthenticated,
    user,
    isAdmin,
    dataLoaded,
  };
}
