import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const loginUser = async () => {
    try {
      // Simulate API call to fetch user data
      const response = await fetch('http://127.0.0.1:8000/api/login'); // Replace with your actual API endpoint
      const userData = await response.json();

      // Update state upon successful login
      setIsAuthenticated(true);
      setUser(userData); // Assuming userData contains user details like name, email, etc.

      toggleMenu(); // Close menu after login
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error if necessary
    }
  };

  const handleLogout = () => {
    // Simulated logout action, reset isAuthenticated and user state
    setIsAuthenticated(false);
    setUser(null);
    toggleMenu(); // Close menu after logout
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <NavLink to='/'> <img src='images/nikah_logo.png' alt="Logo" /></NavLink>
      </div>

      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
        <NavLink to="/about" onClick={toggleMenu}>About</NavLink>
        <NavLink to="/contact" onClick={toggleMenu}>Contact us</NavLink>
        <NavLink to="/articles" onClick={toggleMenu}>Articles</NavLink>
        <NavLink to="/kabin_notary" onClick={toggleMenu}>Kabin Notary</NavLink>
        <NavLink to="/nikah_essentials" className='nikah-essentials' onClick={toggleMenu}>Nikah Essentials</NavLink>
      </div>

      <div className={`login-signup ${isMenuOpen ? 'open' : ''}`}>
        {isAuthenticated ? (
          <>
            <NavLink to="/user_profile" className='username' onClick={toggleMenu}>{user.username}</NavLink>
            <NavLink to="/logout" className='logout' onClick={handleLogout}>Logout</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={loginUser}>Login</NavLink>
            <NavLink to="/signup" onClick={toggleMenu}>SignUp</NavLink>
          </>
        )}
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`} />
        <div className={`bar ${isMenuOpen ? 'open' : ''}`} />
        <div className={`bar ${isMenuOpen ? 'open' : ''}`} />
      </div>
    </div>
  );
}

export default Navbar;
