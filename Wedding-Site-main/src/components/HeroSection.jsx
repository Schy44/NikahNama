import React, {useEffect} from 'react'
import './herosection.css'
import { NavLink } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';

function HeroSection() {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (

    <div className='herosection' data-aos="fade-right" >

        <div className="hero-info">

        <div className="hero-lines">

        <h2>From <span>Match to Marriage</span></h2>
        <h2> We’re With You Every Step</h2>

        <div className="hero-text">

        <p>Welcome,where your love story begins and your wedding dreams come true. Our</p>
        <p>platform connects you with compatible matches and provides everything you need</p>
        <p>for a perfect wedding, all in one place.</p>
        <div className="hero-btn"> <NavLink to='/user_own_profile'> <button>View Profile</button></NavLink></div>

        </div>

        </div>
 
        </div>

    </div>

  )
}

export default HeroSection