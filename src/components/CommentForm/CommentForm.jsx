import { useRef } from 'react';

import './CommentForm.scss';

export const CommentForm = ({ onSubmit }) => {
  const comment = useRef()

  const submitHandler = () => {
    if(comment.current.value) {
      onSubmit(comment.current.value)
      comment.current.value = ''
    }
  }

  return (
    <div className="newComment">
      <textarea
        type="text"
        placeholder="Enter new comment..."
        ref={comment}
        className='newComment__text'
      />
      <button onClick={submitHandler} className="newComment__btn">Add comment</button>
    </div>
  )
}