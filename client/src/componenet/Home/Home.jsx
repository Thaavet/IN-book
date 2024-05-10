import React from 'react'
import INlogo from '../../assets/Logo.png'

import './home.css'

const Home = () => {
  return (
    <div className='home'>
        <div className="home-content">
        <img src={INlogo} alt="" />
        <h1 className='home-title'>INsuperabili Book</h1>
        <p className='home-text'>Empower your mind, shape your future. Reading: the ultimate tool for personal growth</p>
        </div>
    </div>
  )
}

export default Home