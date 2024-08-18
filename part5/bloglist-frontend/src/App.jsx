import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const body = { username, password }
      setUser(await loginService.login(body))

      if (user) {
        setToken(user.token)
        setUsername('')
        setPassword('')
      }
    } catch (exception) {
      console.log("wrong details")
    }

  }

  const loginForm = () => (
    <form>
      <h2>Log in to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => { setUsername(target.value) }}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => { setPassword(target.value) }}
        />
      </div>
      <button onClick={handleLogin}>login</button>
    </form>
  )

  if (user === null) {
    return (
      loginForm()
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.username} logged in
      </div>

      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App