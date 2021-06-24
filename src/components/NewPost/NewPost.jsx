import React, { useEffect, useState } from 'react';

import './NewPost.scss';

export const NewPost = ({ onSubmit, editablePost }) => {

  const [postTitle, setTitle] = useState('');
  const [postBody, setBody] = useState('');
  const [isEditable, setIsEditable] = useState(false);

  const clearForm = () => {
    setTitle('');
    setBody('');
  }

  const handeSubmit = (event) => {
    event.preventDefault();

    if(!postTitle && !postBody) {
      return false
    }

    onSubmit({
      title: postTitle,
      body: postBody,
    });

    clearForm()
  };

  useEffect(() => {
    setIsEditable(Object.keys(editablePost).length !== 0)
    if(isEditable) {
      setTitle(editablePost.title)
      setBody(editablePost.body)
    } else {
      clearForm()
    }
  }, [editablePost])

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
        onClick={handeSubmit}
        className="NewPost__button"
       >
        {isEditable
          ? 'Edit current post'
          : 'Add new post'}
        </button>
     </div>
   )
}