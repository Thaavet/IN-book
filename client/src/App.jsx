
import {BrowserRouter, Router, Routes, Route, Link} from 'react-router-dom'
import { useState } from 'react'
import {Toaster} from 'react-hot-toast'
import Navbar from './componenet/Navbar/Navbar.jsx'
import Home from './componenet/Home/Home.jsx'
import Books from './componenet/Books/Books.jsx'
import Login from './componenet/Login/Login.jsx'
import Dashboard from './componenet/Dashboard/Dashboard.jsx'
import Register from './componenet/register/Register.jsx'
import Logout from './componenet/Logout/Logout.jsx'

function App() {

  const [isAdmin, setIsAdmin] = useState(false);


  return (
    <>
      <BrowserRouter>
      <Toaster position="bottom-right" duration={3000}/>
       <Navbar isAdmin = {isAdmin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={< Books/>}  />
          <Route path="/login" element={<Login setIsAdmin = {setIsAdmin}/>} />
          <Route path="/register" element={<Register />} />
          <Route path ="/dashboard" element={<Dashboard isAdmin = {isAdmin}/>} />
          <Route path ="/addUser" element={<Register />} />
          <Route path ="/logout" element={<Logout />} />
          
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App

