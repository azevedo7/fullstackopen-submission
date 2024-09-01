import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./slices/notificationSlice"
import blogReducer from "./slices/blogSlice"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer
  },
})

export default store
