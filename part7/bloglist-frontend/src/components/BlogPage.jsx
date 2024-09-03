import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { likeBlog, deleteBlog, commentBlog } from "../slices/blogActions"
import { confirmNotification, errorNotification } from "../slices/notificationActions"

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
      navigate("/")
    }
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    e.target.comment.value = ""

    if (!comment || !comment.trim()) {
      dispatch(errorNotification("Comment cannot be empty"))
      return
    }
    dispatch(commentBlog(blog.id, comment))
  }

  return (
    <div className=" mt-4 m-auto max-w-xl">
      <div className="card border rounded-2xl">
        <div className="card-body flex">
          <div className="flex">
            <div className="flex-row flex-1">
              <h2 className="card-title flex-1">{blog.title}</h2>
              <p>by {blog.author}</p>
            </div>
            <div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => dispatch(likeBlog(blog))}
              >
                <div>{blog.likes}</div>
                <div>likes</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="card-actions">
            <a className="link" href={blog.url}>
              {blog.url}
            </a>

            {canDelete && (
              <button
                className="btn btn-error btn-sm text-base-100 ml-auto"
                onClick={() => {
                  handleDelete(blog)
                }}
              >
                delete
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <Comments blog={blog} handleAddComment={handleAddComment} />
    </div>
  )
}

const Comments = ({ blog, handleAddComment }) => {
  return (
    <div>
      <form className="form-control w-full mt-4" onSubmit={handleAddComment}>
        <div className="relative">
          <input
            className="input input-bordered w-full pr-16 rounded-3xl"
            placeholder="add comment"
            name="comment"
            type="text"
          />
          <button className="btn btn-primary btn-sm absolute rounded-3xl top-2 right-2">
            add comment
          </button>
        </div>
      </form>


      {blog.comments.map((comment, index) => (
        <div key={index} className="card bg-base-100 shadow-sm p-4 border mt-4">
          <p>{comment}</p>
        </div>
      ))}
    </div>
  )
}

export default BlogPage
