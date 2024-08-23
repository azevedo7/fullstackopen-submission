import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import notifications from './components/Notifications'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import './styles/App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //blogService.setToken(user.token)
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
      createNotification("wrong username or password", 'error')
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
    const newBlog = await blogService.createBlog(blogObject)
    if (newBlog) {
      blogFormRef.current.toggleShow()
      setBlogs([...blogs, newBlog])
    }

    createNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'confirm')
  }

  const createNotification = (notification, notificationType) => {
    setNotification(notification)
    setNotificationType(notificationType)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {notification && notifications[notificationType](notification)}
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

      {notification && notifications[notificationType](notification)}

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