import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import logo from '../../assets/INlogo.png'

const Navbar = ({isAdmin}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="left-nav">
        <img src= {logo} alt="" />
        < Link to="/" className="nav-brand mb-0 h1">
          INsuperabili Book 
        </Link> 
      </div>


  <div className="right-nav">
    <Link className="nav-link" to="/login">Login</Link> 
    <Link className="nav-link" to="/books">Books</Link>
    {isAdmin ===true &&
    <Link className="nav-link" to="/dashboard">Dashboard</Link>}
    <Link className="nav-link" to="/register">Become a Reader</Link>
  </div>
</nav>

  )
}

export default Navbar