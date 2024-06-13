import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './register.css';
import InLogo from '../../assets/INlogo.png';
import { API_DOMAIN } from '../../constants/constants';

const apiDomain = API_DOMAIN

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { username, email, password } = data; 
    try {
      const response = await axios.post(`${apiDomain}/auth/register`, {
        username,
        email,
        password
      });
      // Handle response
      console.log(data); // Move console.log here
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success('Registration successful. Please login');
        navigate('/login');
      }
    } catch (error) {

      console.log(data);
      toast.error('Registration failed, please try again');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader" />
        </div>
      )}
      <div className="login">
        <div className="lContainer">
          <img className='lImg' src={InLogo} alt="Insuperabili logo" />
          <h1 className="lTitle"> Sign Up</h1>
          <input type="text" placeholder="username" value={data.username} onChange={(e) => setData({...data, username: e.target.value })} className="lInput" disabled={isLoading} />
          <input type="email" placeholder="email" value={data.email} onChange={(e) => setData({...data, email: e.target.value })} className='lInput' disabled={isLoading} />
          <input type="password" placeholder="password" value={data.password} onChange={(e) => setData({...data, password: e.target.value })} className="lInput" disabled={isLoading} />
          <button className="lButton" onClick={registerUser} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Become a Reader'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;