import React, { useState }from 'react';

function CreateProfileForm({ create }) {
  const [handle, setHandle] = useState('');
  const [profilePictureUri, setProfilePictureUri] = useState(null);
  const [transactionUrl, setTransactionUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try{
      setLoading(true);

      console.log(handle, profilePictureUri);
      const tx = await create(handle, profilePictureUri);
      setTransactionUrl(tx);
      setLoading(false);
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <div className="card card-body m-auto">
      <h2>Create Profile</h2>

      <div className="mb-3">
        <label htmlFor="handle" className="form-label">Handle</label>
        <input className="form-control" id="name" onChange={(e) => setHandle(e.target.value)}/>
      </div>

      <div className="mb-3">
        <label htmlFor="handle" className="form-label">Profile Picture Uri</label>
        <input className="form-control" id="name" onChange={(e) => setProfilePictureUri(e.target.value)}/>
      </div>

      <div className="mb-3">
        {!loading
          ? <button className="btn btn-primary btn-lg mb-3" onClick={onSubmit}>
              Create
            </button>
          : <p>Loading...</p>
        }
      </div>
      {transactionUrl &&
        <p className="text-success" style={{ fontSize: '1.4rem'}}>
          Success, see transaction {" "}
          <a href={`https://mumbai.polygonscan.com/tx/${transactionUrl}`} target="_blank" rel="noopener noreferrer">
              {transactionUrl}
          </a>
        </p>
      }
    </div>
  )
}

export default CreateProfileForm