import React, { useEffect, useState } from 'react';

import CreateProfileForm from '../components/profile/CreateProfileForm';
import { createProfile } from '../components/create-profile';
import { getProfiles } from '../components/get-profiles';

function Profile({ walletAddress }) {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if(walletAddress) fetchProfiles();
  }, [walletAddress])

  const fetchProfiles = async() => {
    const req = {
      ownedBy: [walletAddress]
    };

    const _profiles = await getProfiles(req);
    console.log(_profiles);
    setProfile(_profiles.data.profiles.items[0]);
  }
  
  const create = async (handle, profilePictureUri) => {
    const myProfile = { 
      handle: handle,
      profilePictureUri: profilePictureUri,
      followNFTURI: null,
      followModule: null
    };

    const profile = await createProfile(myProfile);
    console.log(profile);
    return profile.data.createProfile.txHash;
  }

  return (
    <div className='container'>
      <h1>Profile</h1>
      <p>Id: {profile.id}</p>
      <p>Handles: {profile.handle}</p>
      <p>Address: {profile.ownedBy}</p>
      {!profile.id &&<CreateProfileForm create={create} />}
    </div>
  )
}

export default Profile;