import React, { useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import "./login.css";
import InLogo from "../../assets/INlogo.png";
import { API_DOMAIN } from '../../constants/constants';
const apiDomain = API_DOMAIN


const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { username, password } = data;
    let response; 
    try {
      response = await axios.post(`${apiDomain}/auth/login`, {
        username,
        password,
        isAdmin,
      });

      if (response.status === 200) {
        const token = response.data.cookie;
        response.data.isAdmin === true? navigate('/dashboard') : navigate('/books');
        setIsAdmin(response.data.isAdmin);
        toast.success('Login successful');
        console.log(response);
      } else {
        toast.error('Login failed');
      }
    
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader" />
        </div>
      )}
      <div className="lContainer">
 
          <img className='lImg' src={InLogo} alt="Insuperabili logo" />
          <h1 className="lTitle"> Login</h1>
        <input type="text" placeholder="username" id="username" onChange={e => setData({...data, username: e.target.value })} className="lInput" disabled={isLoading} />
        <input type="password" placeholder="password" id="password" onChange={e => setData({...data, password: e.target.value })} className="lInput" disabled={isLoading} />
        <button onClick={loginUser} className="lButton" disabled={isLoading}>Login</button>
        <button className="lButton" onClick={() => navigate('/register')} disabled={isLoading}>Register</button>
      </div>
    </div>
  );
};

export default Login;