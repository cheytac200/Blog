export const CommentsList = ({ comments, loading}) => {

  return (
    <div>
      <h2>Comments:</h2>
      {loading
      ? 'Loading comments...'
      : comments &&
      comments.map((comment) => <p key={comment.id}>{comment.body}</p>)
      }
    </div>
  )
}