import React from 'react';

import CreateProfileForm from '../components/profile/CreateProfileForm';
import { createProfile } from '../components/create-profile';

function Profile() {
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
			<CreateProfileForm create={create} />
		</div>
	)
}

export default Profile;