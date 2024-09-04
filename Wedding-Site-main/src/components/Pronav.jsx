import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './profile.css';

function Pronav() {
  const [underlineStyle, setUnderlineStyle] = useState({});
  const navContainerRef = useRef(null);

  const handleNavLinkClick = (e) => {
    const target = e.target;
    const containerRect = navContainerRef.current.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    setUnderlineStyle({
      left: targetRect.left - containerRect.left,
      width: targetRect.width,
    });
  };

  useEffect(() => {
    const activeLink = navContainerRef.current.querySelector('.active');
    if (activeLink) {
      handleNavLinkClick({ target: activeLink });
    }
  }, []);

  return (
    <div className='pronav'>
      <div className='pronav-links' ref={navContainerRef}>
        <NavLink to="/personal_info" className={({ isActive }) => (isActive ? 'active' : '')} onClick={handleNavLinkClick}>
          Personal Information
        </NavLink>
        <NavLink to="/notification" className={({ isActive }) => (isActive ? 'active' : '')} onClick={handleNavLinkClick}>
          Notifications
        </NavLink>
        <NavLink to="/search" className={({ isActive }) => (isActive ? 'active' : '')} onClick={handleNavLinkClick}>
          Search Profiles
        </NavLink>
        
          <NavLink to="/user_own_profile" className={({ isActive }) => (isActive ? 'active' : '')} onClick={handleNavLinkClick}>
         My Profile
         </NavLink>
         <span className='underline' style={underlineStyle}></span>
      </div>
    </div>
  );
}

export default Pronav;
