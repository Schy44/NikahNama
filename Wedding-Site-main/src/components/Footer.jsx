import React from 'react'
import './footer.css'
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer'>
    <div className="footer-section">
                    <h3>Contacts</h3>
                    <p>Suite No: 9/38 (8th Floor), Eastern Plaza, Hatirpool, Dhaka 1205</p>
                </div>
                <div className="footer-section">
                    <h3>Explore</h3>
                    <ul>
                        {/* <li><a href="#">Home</a></li> */}
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><a href="#">Matrimonial Blog</a></li>
                        <li><a href="#">Bangladesh</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Help</h3>
                    <ul>
                        <li><a href="#">Feedback/Queries</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="#">Privacy Features</a></li>
                        <li><a href="#">Terms of Use</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
    </div>
  )
}

export default Footer