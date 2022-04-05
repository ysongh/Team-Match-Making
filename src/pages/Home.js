import React, { useEffect, useState } from 'react';

import { explorePublications } from '../components/lensAPI/explore-publications';
import { createPost } from '../components/lensAPI/create-post-typed-data';

function Home({ userSigner }) {
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

  const create = async() => {
    const tx = await createPost(userSigner);
    console.log(tx);
  }

  return (
    <div className='container'>
      <div className='d-flex justify-content-between mb-4'>
        <h1>List of Posts</h1>
        <button className='btn btn-primary' onClick={create}>
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