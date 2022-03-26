import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Profile from './pages/Profile';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState('');

  return (
     <HashRouter>
      <Navbar
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}/>
      <Routes>
        <Route
          path="/profile"
          element={
            <Profile />} />
        <Route
          path="/"
          element={
            <h1>Home</h1>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
