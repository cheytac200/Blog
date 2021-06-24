import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { PostDetail } from '../../components/PostDetail/PostDetail';
import { useRequest } from '../../hooks/useRequest';
import { CommentsList } from '../../components/CommentsList/CommentsList';
import { CommentForm } from '../../components/CommentForm/CommentForm';

export const PostDetailContainer = ({ currentPost }) => {
  const [comments, setComments] = useState([]);

  const { post, request, loading } = useRequest();

  const loadComments = async() => {
    const data = await request(
      `https://bloggy-api.herokuapp.com/posts/${
        currentPost.id}?_embed=comments`,
    );

    if (data) {
      setComments(data.comments);
    }
  };

  const addCommentHandler = async(comment) => {
    const newComment = await post(
      'https://bloggy-api.herokuapp.com/comments',
      {
        postId: currentPost.id,
        body: comment,
      },
    );

    setComments(prev => [newComment, ...prev]);
  };

  useEffect(() => {
    const load = async() => {
      await loadComments();
    };

    load().then();
  }, [currentPost]);

  return (
    <>
      <PostDetail currentPost={currentPost} />
      <CommentsList comments={comments} loading={loading} />
      <CommentForm onSubmit={addCommentHandler} />
    </>
  );
};

PostDetailContainer.propTypes = {
  currentPost: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};
