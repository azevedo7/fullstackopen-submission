import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { likeBlog, deleteBlog, commentBlog } from "../slices/blogActions"

const BlogPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blog = useSelector((state) => state.blogs).find((b) => b.id == id)
  const user = useSelector((state) => state.user)

  if (!blog) {
    return <h2>No blog found</h2>
  }

  const canDelete = user.username === blog.user.username

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
      navigate('/')
    }
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    const comment = e.target.comment.value

    dispatch(commentBlog(blog.id, comment))
  }

  return (
    <div>
      <h2>{blog.title}</h2>

      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes{" "}
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </p>
      <p>added by {blog.author}</p>

      <Comments blog={blog} handleAddComment={handleAddComment}/>

      {canDelete && (
        <button
          onClick={() => {
            handleDelete(blog)
          }}
        >
          delete
        </button>
      )}
    </div>
  )
}

const Comments = ({blog , handleAddComment}) => {


  return(
    <div>
      <h3>Comments</h3>

      <form onSubmit={handleAddComment}>
        <input name="comment" type="text"/>
        <button>add comment</button>
      </form>

      {blog.comments.length === 0 && <p>no comments</p>}

      {blog.comments.map((comment, index) => (
        <li key={index}>{comment}</li>
      ))}
      
    </div>
  )
}

export default BlogPage
