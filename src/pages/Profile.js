import React, { useEffect, useState } from 'react';

import CreateProfileForm from '../components/profile/CreateProfileForm';
import EditProfileForm from '../components/profile/EditProfileForm';
import { createProfile } from '../components/create-profile';
import { updateProfile } from '../components/update-profile';
import { getProfiles } from '../components/get-profiles';

function Profile({ walletAddress }) {
  const [profile, setProfile] = useState({});
  const [isEdit, setIsEdit] = useState(false);

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

  const update = async (_id, _name, _location, _bio, _website, _twitterUrl) => {
    const newProfile = { 
      profileId: _id,
      name: _name,
      bio: _bio,
      location: _location,
      website: _website,
      twitterUrl: _twitterUrl,
      coverPicture: null
    };

    const profile = await updateProfile(newProfile);
    console.log(profile);
    setIsEdit(false);
    fetchProfiles();
  }

  const UserProfile = () => {
    return <div>
      <p>Id: {profile.id}</p>
      <p>Handles: {profile.handle}</p>
      <p>Address: {profile.ownedBy}</p>
      <p>Name: {profile.name}</p>
      <p>Location: {profile.location}</p>
      <p>Bio: {profile.bio}</p>
      <p>Website: {profile.website}</p>
      <p>Twitter Url: {profile.twitterUrl}</p>
    </div>
  }

  return (
    <div className='container'>
      <div className='d-flex justify-content-between'>
        <h1>Profile</h1>
        <button className='btn btn-success' onClick={() => setIsEdit(!isEdit)}>
          {isEdit ? "Cancel" : "Edit"}
        </button>
      </div>
     
      {isEdit
        ? <EditProfileForm profile={profile} update={update} />
        : !profile?.id ? <CreateProfileForm create={create} /> : <UserProfile />
      }
      
    </div>
  )
}

export default Profile;