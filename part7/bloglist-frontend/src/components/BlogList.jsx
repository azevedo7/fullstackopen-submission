import { useSelector, useDispatch } from "react-redux"
import Blog from "./Blog"
import BlogForm from "./BlogForm"


const BlogList = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  if (!blogs) {
    return null
  }

  

  return (
    <div className="m-4">
      <BlogForm />
      <div className="flex-row justify-center rounded-xl ">
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default BlogList
