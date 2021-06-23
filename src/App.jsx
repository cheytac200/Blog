import './App.scss';
import React, { useEffect, useState } from 'react';

import { PostList } from './components/PostList/PostList';
import { NewPost } from './components/NewPost/NewPost';
import { PostDetailContainer } from './containers/PostDetailContainer/PostDetailContainer';
import { useRequest } from './hooks/useRequest';


function App() {

  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState({});

  const { post, request, loading, del } = useRequest();


  const loadPosts = async () => {
    const data = await request('https://bloggy-api.herokuapp.com/posts')
    setPosts(data)
  }

  const onSelectPost = (post) => {
    setCurrentPost(post)
  }

  const handlerSubmitPost = async (newPost) => {
    const newData = await post(
      'https://bloggy-api.herokuapp.com/posts', newPost
      )
    setPosts((prevState) => [newData, ...prevState])
  }

  const handlerDeletePost = async (id) => {
    await del('https://bloggy-api.herokuapp.com/posts', id)

    await loadPosts()
  }

  useEffect(() => {
    const load = async () => {
      await loadPosts()
    }
    load().then()
  }, [])


  return (
    <main className="App__main">
      <div className="App__sidebar">
        <NewPost loading={loading} onSubmit={handlerSubmitPost}/>
        <PostList
          loading={loading}
          posts={posts}
          onSelectPost={onSelectPost}
          onDelete={handlerDeletePost}
        />
      </div>
      <div className="App__content">
        {Object.keys(currentPost).length !== 0 && (
          <PostDetailContainer loading={loading} currentPost={currentPost}/>
        )}
      </div>


    </main>
  );
}

export default App;
