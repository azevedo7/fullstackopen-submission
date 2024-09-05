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
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Nav />
        <Notification />

        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-content text-primary-content p-3 sticky top-[100vh] mt-4">
      <div className="grid-flow-col">
      made with ♡ by 
      <a className="link" href="https://github.com/azevedo7">azevedo7</a>

      </div>
    </footer>
  )

}

export default App
