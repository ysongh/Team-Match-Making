import React, { useEffect, useState }from 'react';

function EditProfileForm({ profile, update }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [twitterUrl, setTwitterUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(profile.name);
    setLocation(profile.location);
    setBio(profile.bio);
    setWebsite(profile.website);
    setTwitterUrl(profile.twitterUrl);
  }, [profile])
  

  const onSubmit = async () => {
    try{
      setLoading(true);

      console.log(name, location, bio, website, twitterUrl);
      await update(profile.id, name, location, bio, website, twitterUrl);
      setLoading(false);
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <div>
      <p>Id: {profile.id}</p>
      <p>Handles: {profile.handle}</p>
      <p>Address: {profile.ownedBy}</p>
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-1 col-form-label">Name</label>
        <div className="col-sm-11">
          <input className="form-control" id="name" onChange={(e) => setName(e.target.value)} value={name} />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="location" className="col-sm-1 col-form-label">Location</label>
        <div className="col-sm-11">
          <input className="form-control" id="location" onChange={(e) => setLocation(e.target.value)} value={location} />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="bio" className="col-sm-1 col-form-label">Bio</label>
        <div className="col-sm-11">
          <input className="form-control" id="bio" onChange={(e) => setBio(e.target.value)} value={bio} />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="website" className="col-sm-1 col-form-label">Website</label>
        <div className="col-sm-11">
          <input className="form-control" id="website" onChange={(e) => setWebsite(e.target.value)} value={website} />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="twitterUrl" className="col-sm-1 col-form-label">Twitter Url</label>
        <div className="col-sm-11">
          <input className="form-control" id="twitterUrl" onChange={(e) => setTwitterUrl(e.target.value)} value={twitterUrl} />
        </div>
      </div>

      <div className="mb-3">
        {!loading
          ? <button className="btn btn-primary btn-lg mb-3" onClick={onSubmit}>
              Change
            </button>
          : <p>Loading...</p>
        }
      </div>
    </div>
  )
}

export default EditProfileForm;