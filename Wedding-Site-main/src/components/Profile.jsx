import React, { useContext, useEffect } from 'react';
import { ProfileContext } from './ProfileContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { profile, setProfile } = useContext(ProfileContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch('http://127.0.0.1:8000/api/user/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else if (response.status === 401) {
          alert("Session expired. Please log in again.");
          navigate('/login');
        } else {
          alert("Failed to fetch user details. Please try again.");
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert("Failed to fetch user details. Please try again.");
      }
    };

    fetchProfile();
  }, [navigate, setProfile]);

  return (
    <div>
      <h1>User Profile</h1>
      {profile ? (
        <div>
          <p>Username: {profile.username}</p>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
