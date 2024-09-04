import React, { useState, useEffect, useContext } from 'react';
import './userprofile.css';
import Pronav from './Pronav';
import { ProfileContext } from './ProfileContext';

function UserProfile() {
  const [username, setUsername] = useState('');
  const { profileData } = useContext(ProfileContext);

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
      <div className="user-profile">
        <div className="profile-item">
          <h2>User profile</h2>
          <div className="profile-content">
            {profileData ? (
              <div className="profile-data">
                <ul>
                  {Object.entries(profileData.answers).map(([question, answer]) => (


                    <div className='user-profile-info' key={question}>
                      <li>
                        <strong>{question}:</strong> {answer}
                      </li>
                    </div>
                  ))}
                </ul>

                <div className="user-profile-img">
                  <img
                    src={profileData.profilePicture ? profileData.profilePicture : '/images/user_icon.png'}
                    alt="Profile"
                  />
                </div>

              </div>
            ) : (
              <p>Loading profile data...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile
