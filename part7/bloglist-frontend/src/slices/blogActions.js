import { setBlogs, add, like, deleteReducer, comment as commentSlice } from "./blogSlice"
import blogService from "../services/blogs"
import { errorNotification, confirmNotification } from "./notificationActions"

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
    try{
      const updatedBlog = {...blog, likes:blog.likes + 1}
      dispatch(like(updatedBlog))
      dispatch(confirmNotification(`blog ${blog.title} by ${blog.author} liked`))
      return await blogService.likeBlog(updatedBlog)
    } catch(exception) {
      dispatch(errorNotification(`Error voting`))
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(deleteReducer(id))
  }
}

export const commentBlog = (id, comment ) => {
  return async dispatch => {
    try{
      console.log(id, comment)
      await blogService.addComment(id, comment)
      dispatch(commentSlice({id, comment}))
    } catch(error) {
      console.log(error)
      dispatch(errorNotification(`Error adding comment`))
    }
  }
}
