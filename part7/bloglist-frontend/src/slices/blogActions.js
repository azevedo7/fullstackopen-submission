import { setBlogs, addBlog } from "./blogSlice"
import blogService from '../services/blogs'

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const response = await blogService.createBlog(blog)
        dispatch(addBlog(response))
        return response
    }
}