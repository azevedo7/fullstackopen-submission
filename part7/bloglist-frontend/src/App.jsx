import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import BlogForm from "./components/BlogForm"
import Toggleable from "./components/Toggleable"
import "./styles/App.css"

import { useSelector, useDispatch } from "react-redux"
import {
  errorNotification,
  confirmNotification,
} from "./slices/notificationActions"
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from "./slices/blogActions"
import { initializeUser, login, logoutUser } from "./slices/userActions"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [])

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
    } else {
      blogService.setToken(null)
    }
  }, [user])

  const handleLogin = async (e) => {
    e.preventDefault()

    dispatch(login(username, password))
    setUsername("")
    setPassword("")
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const loginForm = () => (
    <form>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => {
              setUsername(target.value)
            }}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => {
              setPassword(target.value)
            }}
          />
        </label>
      </div>
      <button onClick={handleLogin}>login</button>
    </form>
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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  const blogForm = () => (
    <Toggleable buttonLabel={"Create Blog"} ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Toggleable>
  )

  const handleLike = async (blog) => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    await dispatch(likeBlog(newBlog))

    dispatch(confirmNotification(`blog ${blog.title} by ${blog.author} liked`))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <div>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </div>

      <br />
      {blogForm()}
      <br />
      <div>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={handleLike}
            user={user}
            deleteBlog={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default App
