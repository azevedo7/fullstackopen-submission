import { setUser, logout } from "./userSlice"
import loginService from '../services/login'
import { errorNotification } from "./notificationActions"

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try{
        const body = { username, password }
        const user = await loginService.login(body)
    
        window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
        dispatch(setUser(user))
    } catch(exception) {
        dispatch(logout())
        dispatch(errorNotification('wrong username or password'))
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser")
    dispatch(logout())
  }
}