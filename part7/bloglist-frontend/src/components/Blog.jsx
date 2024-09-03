import { Link } from "react-router-dom"

const Blog = ({ blog }) => {
  
  return (
    <Link to={`/blogs/${blog.id}`}>
      <div className="card rounded-2xl shadow-md p-4 m-4 max-w-xl mx-auto">
        {blog.title}
      </div>
    </Link>
  )
}

export default Blog
