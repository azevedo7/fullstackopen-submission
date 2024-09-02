import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import blogService from "./services/blogs"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogList from "./components/BlogList"
import BlogPage from "./components/BlogPage"
import Users from "./components/Users"
import User from "./components/User"
import Nav from "./components/Nav"
import "./styles/App.css"

import { useSelector, useDispatch } from "react-redux"
import { initializeBlogs } from "./slices/blogActions"
import { initializeUser} from "./slices/userActions"
import { initializeUsers } from "./slices/usersActions"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
    } else {
      blogService.setToken(null)
    }
  }, [user])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <Router>
      <div>
        <Nav />
        <h2>blogs</h2>
        <Notification />

        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogPage />} />
        </Routes>

      </div>
    </Router>
  )
}

export default App
