import { useSelector, useDispatch } from "react-redux"
import { useRef } from "react"
import { Link } from "react-router-dom"
import Blog from "./Blog"
import BlogForm from "./BlogForm"
import Toggleable from "./Toggleable"

import { likeBlog, deleteBlog, createBlog } from "../slices/blogActions"
import { confirmNotification } from "../slices/notificationActions"

const BlogList = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  if (!blogs) {
    return null
  }

  const blogForm = () => (
    <Toggleable buttonLabel={"Create Blog"} ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Toggleable>
  )

  const addBlog = async (blogObject) => {
    const newBlog = await dispatch(createBlog(blogObject))
    if (newBlog) {
      blogFormRef.current.toggleShow()
    }

    dispatch(
      confirmNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      )
    )
  }

  return (
    <div>
      {blogForm()}
      <div>
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default BlogList
