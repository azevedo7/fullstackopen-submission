import { useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"

const User = () => {
  let { id } = useParams()
  const user = useSelector((state) => state.users).find((u) => u.id === id)

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="container mx-auto max-w-xl p-4">
      <h1 className="text-3xl font-bold text-center">{user.username}</h1>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {user.blogs.map((b) => (
          <Link className="card border m-4 p-4 link hover:text-primary" to={`/blogs/${b.id}`} key={b.id}>
              {b.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default User
