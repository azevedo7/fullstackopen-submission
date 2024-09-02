import { useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"

const User = () => {
    let { id } = useParams()
    const user = useSelector(state => state.users)
        .find(u => u.id === id)
    
    if(!user) {
        return(
            <div>User not found</div>
        )
    }

    return(
        <div>
            <h1>{user.username}</h1>

            <h2>added blogs</h2>
            <ul>
                {user.blogs.map(b => 
                    <li key={b.id}>
                        <Link to={`/blogs/${b.id}`}>{b.title}</Link>
                    </li>     
                )} 
            </ul>
        </div>
    )
}

export default User