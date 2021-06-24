import React from 'react';
import PropTypes from 'prop-types';

export const PostDetail = ({ currentPost }) => (
  <div className="postDetail">
    <h2>Post Detail</h2>
    <h3>{currentPost.title}</h3>
    <p>{currentPost.body}</p>
  </div>
);

PostDetail.propTypes = {
  currentPost: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};
