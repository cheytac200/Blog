import React, { useState } from 'react';

import './NewPost.scss';

export const NewPost = ({ addNewPost }) => {

  const [postTitle, setTitle] = useState('');
  const [postBody, setBody] = useState('');

  const handeSubmit = (event) => {
    event.preventDefault();

    if(!postTitle && !postBody) {
      return false
    }

    addNewPost({
      title: postTitle,
      body: postBody,
    });

    setTitle('');
    setBody('');
  };

   return (
     <div className="NewPost">
       <input
        className="NewPost__inp title"
        type='text'
        placeholder="Enter a title"
        value={postTitle}
        required
        onChange={event => setTitle(event.target.value)}
      />

       <textarea
        className="NewPost__inp body"
        type='text'
        placeholder="Enter a text"
        value={postBody}
        required
        onChange={event => setBody(event.target.value)}
      />
       <button
        type="submit"
        onClick={handeSubmit}
        className="NewPost__button"
       >
        Add Post</button>
     </div>
   )
}