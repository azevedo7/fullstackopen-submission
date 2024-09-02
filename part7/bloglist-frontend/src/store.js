import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./slices/notificationSlice"
import blogReducer from "./slices/blogSlice"
import userReducer from "./slices/userSlice"
import usersReducer from "./slices/usersSlice"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
  },
})

export default store
