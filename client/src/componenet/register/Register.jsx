import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './register.css';
import InLogo from '../../assets/INlogo.png';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { username, email, password } = data; 
    try {
      const response = await axios.post('https://in-book.onrender.com/api/v1/auth/register', {
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
    }
  };

  return (
    <div>
      <div className="login">
        <div className="lContainer">
          <img className='lImg' src= {InLogo} alt="Insuperabili logo" />
          <h1 className="lTitle"> Sign Up</h1>
          <input type="text" placeholder="username" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} className="lInput" />
          <input type="email" placeholder="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className='lInput' />
          <input type="password" placeholder="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} className="lInput" />
          <button className="lButton" onClick={registerUser}>Become a Reader</button>
        </div>
      </div>
    </div>
  );
};

export default Register;