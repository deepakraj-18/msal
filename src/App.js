// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MsalAuthenticationTemplate, useIsAuthenticated } from '@azure/msal-react';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';

const App = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Router>
      <Routes>
        <Route path="/profile" element={
          <MsalAuthenticationTemplate>
            <Profile />
          </MsalAuthenticationTemplate>
        } />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
