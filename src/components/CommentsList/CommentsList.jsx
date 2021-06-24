import React from 'react';
import PropTypes from 'prop-types';

export const CommentsList = ({ comments, loading }) => (
  <div>
    <h2>Comments:</h2>
    {loading
      ? 'Loading comments...'
      : comments
    && comments.map(comment => <p key={comment.id}>{comment.body}</p>)
    }
  </div>
);

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};
