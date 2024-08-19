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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if(user){
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
      console.log(exception)
      console.log("wrong details")
    }
  }
  
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
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

  const createBlog = (e) =>{
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const formDataObj = Object.fromEntries(formData.entries())

    blogService.createBlog(formDataObj)
  }

  const blogForm = () => (
    <form onSubmit={createBlog}>
      <div>
        title
        <input 
          type='text'
          name='title'
        />
      </div>
      <div>
        author
        <input 
          type='text'
          name='author'
        />
      </div>
      <div>
        url
        <input 
          type='url'
          name='url'
        />
      </div>
      <button type='submit'>create</button>
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
        <button onClick={handleLogout}>logout</button>
      </div>

      <br/>
      {blogForm()}
      <br/>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App