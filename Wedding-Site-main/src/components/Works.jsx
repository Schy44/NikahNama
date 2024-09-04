import React, {useEffect} from 'react'
import './work.css'
import { RiFileSearchLine } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { BsChatLeftHeartFill } from "react-icons/bs";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Works() {


  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);


  return (
    <div className='works' data-aos="fade-right">

          <h2>How our website works?</h2>  
          <p>Get  <span>Started</span> in 3 easy steps</p>

          <div className="work-container">

            <div className="w-card"> 

            <div className="work-card">
            <div className="work-card-icon">
                <ImProfile  className='work-icon' />
                
                </div>
                <p>Create Your Profile</p>
            </div>
            <p className='w-p1'>Create your profile & decide</p> 
            <p className='w-p2'>which fields to hide from the public.</p>
            </div>
            

            <div className="w-card">
            <div className="work-card">
                <div className="work-card-icon">
                    <RiFileSearchLine className='work-icon' />
                </div>
                <p>Search Your Partner</p>
            </div>
            <p className='w-p1'>Search for your preferred partner,</p> 
            <p className='w-p2'>request for receiving private information</p>
            </div>

            <div className="w-card">
            <div className="work-card">
            <div className="work-card-icon">
                    <BsChatLeftHeartFill  className='work-icon' />
                </div>
                <p>Start Communication</p>
            </div>
            <p className='w-p1'>Notify Admin for further  </p> 
            <p className='w-p2'>communication</p>
            </div>
            
          </div>
    </div>
  )
}

export default Works