import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name: 'filter',
    initialState: 'ALL',
    reducers: {
        setFilter(state, action) {
            if(action.payload.trim().length === 0) return 'ALL'
            return action.payload
        }
    }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer