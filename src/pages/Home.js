import React, { useEffect, useState } from 'react';

import { explorePublications } from '../components/explore-publications';
import { createPostTypedData } from '../components/create-post-typed-data';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [])

  const fetchPosts = async() => {
    const req = {
      "sortCriteria": "TOP_COLLECTED",
      "limit": 10
    };

    const _posts = await explorePublications(req);
    console.log(_posts);
    setPosts(_posts.data.explorePublications.items);
  }

  const createPost = async() => {
    const req = {
      profileId: "0x0295",
      contentURI: "ipfs://QmZJTaXfWxRVX33drEYHjKUksrahFdzgZ5pevd94sskLwn.json",
      collectModule: {
        revertCollectModule: true
      },
      referenceModule: {
        followerOnlyReferenceModule: false
      }
    }

    const _newPost = await createPostTypedData(req);
    console.log(_newPost);
  }

  return (
    <div className='container'>
      <button onClick={createPost}>Create Post</button>
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

export default Home;