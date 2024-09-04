import React, { useState, useEffect } from 'react';
import './notif.css';
import Pronav from './Pronav';

function Notification() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user/', { //Your API Endpoint
          headers: {
            'Content-Type': 'application/json',
            // Add any authentication headers if needed
            // e.g., Authorization: `Bearer ${accessToken}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch username');
        }
        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

  return (
    <div className='profile'>
      <div className="welcome">
        {username ? (
          <h2>Welcome, {username}</h2>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Pronav />


      <div className="notification">
        <div className="notification-item">
          <h2>Notifications</h2>
          <div className="notification-content">
            {/* <h3>{username} Wants to get your pictures?</h3> */}
            <p> wants to see your profile picture?</p>
            <button>Accept</button>
            <button>Decline</button>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Notification
