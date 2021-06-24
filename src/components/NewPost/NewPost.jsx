import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './NewPost.scss';

export const NewPost = ({ onSubmit, editablePost }) => {
  const [postTitle, setTitle] = useState('');
  const [postBody, setBody] = useState('');
  const [isEditable, setIsEditable] = useState(false);

  const clearForm = () => {
    setTitle('');
    setBody('');
  };

  const handeSubmit = (event) => {
    event.preventDefault();

    if (!postTitle && !postBody) {
      return;
    }

    onSubmit({
      title: postTitle,
      body: postBody,
    });

    clearForm();
  };

  useEffect(() => {
    setIsEditable(Object.keys(editablePost).length !== 0);
    if (isEditable) {
      setTitle(editablePost.title);
      setBody(editablePost.body);
    } else {
      clearForm();
    }
  }, [editablePost, isEditable]);

  return (
    <div className="NewPost">
      <input
        className="NewPost__inp title"
        type="text"
        placeholder="Enter a title"
        value={postTitle || ''}
        required
        onChange={event => setTitle(event.target.value)}
      />

      <textarea
        className="NewPost__inp body"
        type="text"
        placeholder="Enter a text"
        value={postBody || ''}
        required
        onChange={event => setBody(event.target.value)}
      />

      <button
        type="button"
        onClick={handeSubmit}
        className="NewPost__button"
      >
        {isEditable
          ? 'Edit current post'
          : 'Add new post'}
      </button>
    </div>
  );
};

NewPost.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  editablePost: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};
