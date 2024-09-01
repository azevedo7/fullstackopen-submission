import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    type: "",
  },
  reducers: {
    set: (state, action) => {
      return action.payload
    },
    clear: () => {
      return { message: "", type: "" } 
    },
  },
})

export const { set, clear } = notificationSlice.actions

export default notificationSlice.reducer
