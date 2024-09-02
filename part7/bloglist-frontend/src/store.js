import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./slices/notificationSlice"
import blogReducer from "./slices/blogSlice"
import userReducer from './slices/userSlice'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
  },
})

export default store
