import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import { ProfileProvider } from './components/ProfileContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(

<React.StrictMode>
    <Auth0Provider
      domain="dev-i4t6go7grrhd3srl.us.auth0.com"
      clientId="OgR3WGgbfglz9Ne1mRE4fQmmOa0U6zRw"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </Auth0Provider>
  </React.StrictMode>
)
