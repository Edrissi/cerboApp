import React, { useState, useEffect } from 'react';
import fetchTableData from '@/api/fetchTableData';

export default function AuthorsTableData(userOrInvis) {
  const [authorsTableData, setAuthorsTableData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    
    const fetchUsersData = async () => {
      try {
        const response = await fetchTableData(userOrInvis);
        setAuthorsTableData(response);
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching user data", error);
        setAuthorsTableData({});
        setDataLoaded(true);
      }
    };

    fetchUsersData();
  }, [userOrInvis]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (!dataLoaded) {
    return { authorsTableData: {}, dataLoaded: false, handlePageChange };
  }

  return { authorsTableData, setAuthorsTableData, dataLoaded, handlePageChange, currentPage };
}
