import React from 'react';
import PropTypes from 'prop-types';

import './PostList.scss';


export const PostList = ({ loading, posts, onSelectPost }) => (
  <div className="PostList">
    <h2>Posts:</h2>
      {loading ? (
        <p>Loading data...</p> ) : (
          <>
          {posts.map(post => (
            <ul className="PostList__list" key={post.id}>
              <li
                className="PostList__item"
              >
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <div className="PostList">
                </div>
                <div className="PostList__buttons">
                  <button
                    type="button"
                    className="PostList__button button"
                    onClick={onSelectPost.bind('', post)}
                  >
                    Post details
                  </button>
                </div>
              </li>
            </ul>
          ))
          }
          </>
        )
      }
  </div>
);

