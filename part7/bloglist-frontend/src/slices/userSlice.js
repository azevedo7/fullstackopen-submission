import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: { token: null, username: null },
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            return action.payload
        },
        logout: (state, action) => {
            return null 
        }
    }
})

export const { setUser, logout } = userSlice.actions

export default userSlice.reducer