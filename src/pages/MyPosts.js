import React, { useEffect, useState } from 'react';

import { getPublications } from '../components/lensAPI/get-publications';

function MyPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [])

  const fetchPosts = async() => {
    const req = {
      "profileId": "0x0295",
       // you can filter the publication types along side it
      "publicationTypes": ["POST", "COMMENT", "MIRROR"]
      // also dont forget you can filter these queries on sources as well
      // "sources": ["lost-place-dapp"]
   }

    const _posts = await getPublications(req);
    console.log(_posts);
    setPosts(_posts.data.publications.items);
  }

  return (
    <div className='container'>
      <h1>Your Posts</h1>
      {posts.map(post => (
        <div className="card mb-3" key={post.id}>
          <div className="card-header">
            {post.metadata.name}
          </div>
          <div className="card-body">
            <h5 className="card-title">{post.createdAt}</h5>
            <p className="card-text">{post.metadata.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyPosts;