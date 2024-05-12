import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ProjectsTabledata = () => {
  const [projectsData, setProjectsData] = useState({
    projects: [],
    loader: true,
  });

  useEffect(() => {
    const getProjects = async () => {
      try {
          const jwtCookie = Cookies.get('jwt');
          if (jwtCookie) {
            const response = await axios.get("http://localhost:8000/invis/projects", {
              headers: {
                Authorization: `Bearer ${jwtCookie}`,
              },
            });
            setProjectsData({
              projects: response.data,
              loader: false,
            });
          }

        } catch (error) {
        console.error('Error checking data', error);
        throw error;
        }
    };

    getProjects();
  }, []);

  return { projects: projectsData.projects, loader: projectsData.loader };
};

export default ProjectsTabledata;
