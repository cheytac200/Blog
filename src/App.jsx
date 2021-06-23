import './App.scss';
import React, { useEffect, useState } from 'react';

import { PostList } from './components/PostList/PostList';
import { NewPost } from './components/NewPost/NewPost';
import { PostDetail } from './components/PostDetail/PostDetail';
import { useRequest } from './hooks/useRequest';



function App() {

  const [posts, setPosts] = useState([]);
  const { request, loading } = useRequest();

  const loadPosts = async () => {
    const data = await request('https://bloggy-api.herokuapp.com/posts')
    setPosts(data)
  }

  useEffect(() => {
    const load = async () => {
      await loadPosts()
    }
    load().then()
  }, [])

  const addNewPost = ( title, body ) => {
    const newPost = {
      title,
      body,
    };

    setPosts(prevState => {
      return [
        newPost,
        ...prevState,
      ]
    })

  }

  return (
    <main className="App__main">
      <div className="App__sidebar">
        <NewPost loading={loading} addNewPost={addNewPost}/>
        <PostList loading={loading} posts={posts} />
      </div>
      <div className="App__content">
        {/* <PostDetail /> */}
      </div>


    </main>
  );
}

export default App;
