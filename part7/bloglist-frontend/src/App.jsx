import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import './styles/App.css'

import { useSelector, useDispatch } from 'react-redux'
import { errorNotification, confirmNotification } from './slices/notificationActions'
import { initializeBlogs, createBlog } from './slices/blogActions'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogs = useSelector((state) => state.blogs)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
    } else {
      blogService.setToken(null)
    }
  }, [user])


  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const body = { username, password }
      const user = await loginService.login(body)

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      //setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(errorNotification('wrong username or password'))
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
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
            onChange={({ target }) => { setUsername(target.value) }}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => { setPassword(target.value) }}
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

    dispatch(confirmNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`))
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
    <Toggleable buttonLabel={'Create Blog'} ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Toggleable>
  )

  const likeBlog = async (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    const response = await blogService.likeBlog(blog.id, updatedBlog)

    dispatch(confirmNotification(`blog ${blog.title} by ${blog.author} liked`))
    setBlogs(blogs.map(b => b.id === blog.id ? { ...b, likes: b.likes + 1 } : b))
  }

  const deleteBlog = async blog => {
    if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
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
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} user={user} deleteBlog={deleteBlog} />
        )}
      </div>
    </div>
  )
}

export default App