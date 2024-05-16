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

        await axios.post("https://in-book.onrender.com/api/v1/auth/logout", null, config);

        localStorage.removeItem("access_token");

        navigate('/');
      } catch (error) {
        console.error('Logout failed:', error);
   
      }
    };

    logoutUser();
  }, [navigate]);

  return null; 
};

export default Logout;