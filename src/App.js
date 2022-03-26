import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
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
            <Profile walletAddress={walletAddress} />} />
        <Route
          path="/"
          element={
            <Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
