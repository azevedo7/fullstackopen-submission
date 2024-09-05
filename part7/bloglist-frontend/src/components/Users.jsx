import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Users = () => {
    const users = useSelector(state => state.users)
    console.log(users)

    return(
        <div className="container max-w-xl mx-auto m-4 p-4 rounded-xl bg-secondary-content">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Blogs created</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td><Link className="link" to={`/users/${user.id}`}>{user.username}</Link></td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users