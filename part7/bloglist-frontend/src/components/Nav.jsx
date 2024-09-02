import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { logoutUser } from "../slices/userActions"

const style = {
    background: "lightgray",
    padding: 5,
}

const Nav = () => {
    const user = useSelector((state) => state.user)

    if (!user) {
        return null
    }

    return (
        <div style={style}>
            <Link style={{ marginRight: 10 }} to="/">blogs</Link>
            <Link style={{ marginRight: 10 }} to="/users">users</Link>
            <span style={{ marginRight: 10 }}>{user.username} logged in</span>
            <button onClick={() => {dispatch(logoutUser())}}>logout</button>
        </div>
    )
}

export default Nav