import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.post("http://localhost:3000/api/v1/auth/logout", null, config);

        // Clear the token from local storage
        localStorage.removeItem("access_token");

        // Redirect to the login page or perform any other necessary actions
        // ...
        navigate('/');
      } catch (error) {
        console.error('Logout failed:', error);
        // Handle the logout error
      }
    };

    logoutUser();
  }, [navigate]);

  return null; // Return null or another component if needed
};

export default Logout;