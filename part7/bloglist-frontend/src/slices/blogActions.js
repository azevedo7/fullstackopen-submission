import { setBlogs, add, like, deleteReducer } from "./blogSlice"
import blogService from "../services/blogs"

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.createBlog(blog)
    dispatch(add(response))
    return response
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    dispatch(like(blog))
    return await blogService.likeBlog(blog)
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(deleteReducer(id))
  }
}
