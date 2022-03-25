import React, { useEffect } from 'react';
import { gql } from '@apollo/client';

import { apolloClient } from './ApolloClient';

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
  
  return (
    <div>

    </div>
  )
}

export default Test