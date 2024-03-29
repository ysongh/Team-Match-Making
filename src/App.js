import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import MyPosts from './pages/MyPosts';
import Profile from './pages/Profile';

function App() {
  const [profileId, setProfileId] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [userSigner, setUserSigner] = useState(null);

  return (
     <HashRouter>
      <Navbar
        walletAddress={walletAddress}
        profileId={profileId}
        setWalletAddress={setWalletAddress}
        setUserSigner={setUserSigner} />
      <Routes>
        <Route
          path="/my-posts"
          element={
            <MyPosts />} />
        <Route
          path="/profile"
          element={
            <Profile walletAddress={walletAddress} setProfileId={setProfileId} />} />
        <Route
          path="/"
          element={
            <Home
              userSigner={userSigner}
              profileId={profileId} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
