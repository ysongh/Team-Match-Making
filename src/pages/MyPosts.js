import React, { useEffect, useState } from 'react';

import { getPublications } from '../components/get-publications';

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
      {posts.map(post => (
        <div key={post.id}>
          <h2>
            {post.metadata.name}
          </h2>
          <p>{post.metadata.content}</p>
          <p>{post.createdAt}</p>
        </div>
      ))}
    </div>
  )
}

export default MyPosts;