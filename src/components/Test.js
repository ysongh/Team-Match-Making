import React, { useEffect } from 'react';
import { gql } from '@apollo/client';
import { ethers } from 'ethers';

import Web3Modal from 'web3modal';

import { apolloClient } from './apollo-client';
import { generateChallenge } from './generate-challenge';
import { authenticate } from './authenticate';

function Test() {
  useEffect(() => {
    queryExample();
  }, [])

  const query  = `
    query {
      ping
    }
  `;

  const queryExample = async () => {
    const response = await apolloClient.query({
      query: gql(query),
    })
    console.log('Lens example data: ', response)
  }

  const connect = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);  
    console.log(provider);

    const signer = provider.getSigner();
    console.log(signer);
    const address = await signer.getAddress();
    console.log(address);

    const challengeResponse = await generateChallenge(address);
    const signature = await signer.signMessage(challengeResponse.data.challenge.text)
    console.log(signature);

    const res = await authenticate(address, signature);
    console.log(res);
  }
  
  return (
    <div>
      <button onClick={connect}>Connect</button>
    </div>
  )
}

export default Test