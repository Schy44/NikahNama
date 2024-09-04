import React, {useEffect} from 'react'
import './meshsec.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Meshsec() {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);


  return (
    
    <div className="mesh-sec" data-aos="fade-up">
    <div className="circle-container ">
        <div className="mesh-lines">
        <h3>Why Us ?</h3>
        <div className="circle-text">
          <div className="circlep">
          <p>Exclusively for Muslims</p>          
            <p>based on Islamic guidelines.</p>
            <p>Trusted Network, Secure and Reliable</p>
            <p>verified profiles</p>
          </div>
          <div className="circleimg">
            <img className='nikah1' src='images/nikah1.jpeg'></img>
          </div>
            
        </div>
        </div>
        <div className="mesh-img">
            <img className='nikah3' src='images/nikah3.jpeg'></img>
            <img className='nikah2' src="images/nikah2.jpeg" />
        </div>              
          </div>
          <div className="circle "></div> 
    </div>

  )
}

export default Meshsec