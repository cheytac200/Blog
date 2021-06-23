
export const PostDetail = ({ currentPost }) => {
  return (
    <div className="postDetail">
      <h2>Post Detail</h2>
      <h3>{currentPost.title}</h3>
      <p>{currentPost.body}</p>
    </div>
  )
}