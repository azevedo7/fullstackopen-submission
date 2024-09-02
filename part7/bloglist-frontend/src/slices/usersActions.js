import { setUsers } from "./usersSlice"
import userService from "../services/users"

export const initializeUsers = () => {
    return async (dispatch) => {
        const users = await userService.getAll()
        dispatch(setUsers(users))
    }
}