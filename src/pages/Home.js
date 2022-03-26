import React, { useEffect, useState } from 'react';

import { explorePublications } from '../components/explore-publications';

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

export default Home;