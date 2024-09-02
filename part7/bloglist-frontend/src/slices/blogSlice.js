import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs: (state, action) => {
            return action.payload
        },
        add: (state, action) => {
            state.push(action.payload)
        },
        like: (state, action) => {
            // action.payload will be the updatedBlog 
            const id = action.payload.id
            return state.map(blog => blog.id == id ? action.payload : blog)
        },
        deleteReducer: (state, action) => {
            const id = action.payload
            return state.filter(b => b.id != id)
        },
        comment: (state, action) => {
            const { id, comment } = action.payload
            const newBlog = state.find(b => b.id == id)
            if(!newBlog.comments) {
                newBlog.comments = [comment]
            } else {
                newBlog.comments.push(comment)
            }

            return state.map(blog => blog.id == id ? newBlog : blog)
        }
    }
})

export const { setBlogs, add, like, deleteReducer, comment } = blogSlice.actions

export default blogSlice.reducer