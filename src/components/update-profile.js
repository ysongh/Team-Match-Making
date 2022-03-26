import { gql } from '@apollo/client';

import { apolloClient } from './apollo-client';

const UPDATE_PROFILE = `
  mutation($request: UpdateProfileRequest!) { 
    updateProfile(request: $request) {
     id
    }
 }
`

export const updateProfile = (profileInfo) => {
   return apolloClient.mutate({
    mutation: gql(UPDATE_PROFILE),
    variables: {
      request: profileInfo,
    },
  })
}