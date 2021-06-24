import './App.scss';
import React, { useEffect, useState } from 'react';

import { PostList } from './components/PostList/PostList';
import { NewPost } from './components/NewPost/NewPost';
import { PostDetailContainer } from
  './containers/PostDetailContainer/PostDetailContainer';
import { useRequest } from './hooks/useRequest';

function App() {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [editablePost, setEditablePost] = useState({});
  const { post, request, loading, del, put } = useRequest();

  const loadPosts = async() => {
    const data = await request('https://bloggy-api.herokuapp.com/posts');

    setPosts(data);
  };

  // const handlerSelectPost = (cuPost) => {
  //   setCurrentPost(currentPost);
  // };

  const handlerSubmitPost = async(newPost) => {
    if (Object.keys(editablePost).length !== 0) {
      await put(
        'https://bloggy-api.herokuapp.com/posts',
        editablePost.id, newPost,
      );

      setPosts(prevState => prevState.map((item) => {
        if (item.id === editablePost.id) {
          return {
            ...item,
            ...newPost,
          };
        }

        return item;
      }));
      setEditablePost({});
    } else {
      const newData = await post(
        'https://bloggy-api.herokuapp.com/posts', newPost,
      );

      setPosts(prevState => [newData, ...prevState]);
    }
  };

  const handlerDeletePost = async(id) => {
    const shouldDelete = window.confirm(
      'Вы действительно хотите удалить этот пост?',
    );

    if (shouldDelete) {
      await del('https://bloggy-api.herokuapp.com/posts', id);
      await loadPosts();
    }
  };

  // const handlerEditPost = (post) => {
  //   setEditablePost(post);
  // };

  useEffect(() => {
    const load = async() => {
      await loadPosts();
    };

    load().then();
  }, []);

  return (
    <main className="App__main">
      <div className="App__sidebar">
        <NewPost
          loading={loading}
          onSubmit={handlerSubmitPost}
          editablePost={editablePost}
        />
        <PostList
          loading={loading}
          posts={posts}
          onSelectPost={setCurrentPost}
          onDelete={handlerDeletePost}
          onEditPost={setEditablePost}
        />
      </div>
      <div className="App__content">
        {Object.keys(currentPost).length !== 0 && (
          <PostDetailContainer loading={loading} currentPost={currentPost} />
        )}
      </div>
    </main>
  );
}

export default App;
