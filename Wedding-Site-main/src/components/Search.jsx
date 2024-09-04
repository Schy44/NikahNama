import React, { useState, useEffect } from 'react';
import './profile.css';
import Pronav from './Pronav';

export default function Search() {
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
      Search
    </div>
  );
}
