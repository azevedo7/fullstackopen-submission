import { Link } from "react-router-dom"

const Blog = ({ blog }) => {
  const blogStyle = {
    border: "1px solid black",
    padding: 5,
    margin: "5px 0px",
  }

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  )
}

export default Blog
