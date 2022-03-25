import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';

import Web3Modal from 'web3modal';
import { generateChallenge } from '../../components/generate-challenge';
import { authenticate } from '../../components/authenticate';

function Navbar({ walletAddress, setWalletAddress }) {
  const connectWallet = async () => {
    try{
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);  
      console.log(provider);

      const signer = provider.getSigner();
      console.log(signer);
      const address = await signer.getAddress();
      console.log(address);
      setWalletAddress(address);

      const challengeResponse = await generateChallenge(address);
      const signature = await signer.signMessage(challengeResponse.data.challenge.text)
      console.log(signature);

      const res = await authenticate(address, signature);
      console.log(res);
      localStorage.setItem("auth_token", res.data.authenticate.accessToken);
    } catch(error) {
      console.error(error);
    }  
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Team Match Making</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/test">Test</Link>
            </li>
          </ul>
          <button className="btn btn-outline-success" type="submit"  onClick={connectWallet}>
            {walletAddress ? walletAddress.substring(0,8) + "..." + walletAddress.substring(34,42) : "Connect to Wallet"}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;