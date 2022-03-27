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
        emptyCollectModule: true
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
      <div className='d-flex justify-content-between mb-4'>
        <h1>List of Posts</h1>
        <button className='btn btn-primary' onClick={createPost}>
          Create Post
        </button>
      </div>
      {posts.map(post => (
        <div className="card mb-3" key={post.id}>
          <div className="card-header">
            {post.metadata.name}
          </div>
          <div className="card-body">
            <h5 className="card-title">{post.createdAt}</h5>
            <p className="card-text">{post.metadata.content}</p>
            <a href="#" className="btn btn-primary">View</a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home;