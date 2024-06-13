import React from 'react';
import { BrowserRouter, Router, Routes, Route, Link } from 'react-router-dom';
import { useState, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './componenet/Navbar/Navbar.jsx';

const Home = React.lazy(() => import('./componenet/Home/Home.jsx'));
const Books = React.lazy(() => import('./componenet/Books/Books.jsx'));
const Login = React.lazy(() => import('./componenet/Login/Login.jsx'));
const Dashboard = React.lazy(() => import('./componenet/Dashboard/Dashboard.jsx'));
const Register = React.lazy(() => import('./componenet/register/Register.jsx'));
const Logout = React.lazy(() => import('./componenet/Logout/Logout.jsx'));

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Toaster position="bottom-right" duration={3000} />
        <Navbar isAdmin={isAdmin} />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard isAdmin={isAdmin} />} />
            <Route path="/addUser" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;