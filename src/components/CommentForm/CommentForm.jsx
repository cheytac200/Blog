import React, { useRef } from 'react';

import PropTypes from 'prop-types';

import './CommentForm.scss';

export const CommentForm = ({ onSubmit }) => {
  const comment = useRef();

  const submitHandler = () => {
    if (comment.current.value) {
      onSubmit(comment.current.value);
      comment.current.value = '';
    }
  };

  return (
    <div className="newComment">
      <textarea
        type="text"
        placeholder="Enter new comment..."
        ref={comment}
        className="newComment__text"
      />
      <button
        type="button"
        onClick={submitHandler}
        className="newComment__btn"
      >
        Add comment
      </button>
    </div>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
