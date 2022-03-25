import React, { useState } from 'react';

import Navbar from './components/layout/Navbar';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState('');

  return (
    <div >
      <Navbar
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}/>
    </div>
  );
}

export default App;
