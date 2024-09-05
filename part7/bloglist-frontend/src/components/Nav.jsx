import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { logoutUser } from "../slices/userActions"


const Nav = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    if (!user) {
        return null
    }

    return (
        <div className="navbar bg-base-100 flex shadow ">
            <div className="navbar-start flex gap-2">
                <Link className="btn btn-ghost text-xl btn-active" to="/">Blogs</Link>
                <Link className="btn btn-ghost text-xl" to="/users">Users</Link>
            </div>
            <div className="navbar-end">
                <span style={{ marginRight: 10 }}>{user.username}</span>
                <div className="dropdown dropdown-end">
                    <div tabIndex="0" role="button" className="btn btn-ghost rounded-btn"><svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                    </svg></div>

                    <ul tabIndex="0" className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow">
                        <li>
                            <button onClick={() => { dispatch(logoutUser()) }}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Nav