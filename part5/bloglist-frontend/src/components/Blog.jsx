import { useState, useEffect } from 'react'

const Blog = ({ blog, likeBlog, user, deleteBlog }) => {
  const [view, setView] = useState(false)
  const [canDelete, setCanDelete] = useState(false)

  useEffect(() => {
    if (user && blog.user) {
      setCanDelete(user.username === blog.user.username)
    }
  }, [user, blog])

  const blogStyle = {
    border: '1px solid black',
    padding: 5,
    margin: '5px 0px',
  }

  const toggleView = () => { setView(!view) }

  if (!view) {
    return (
      <div style={blogStyle} data-testid='blog'>
        {blog.title}, {blog.author}
        <button onClick={toggleView} className='viewButton'>view</button>
      </div>
    )
  }

  return (
    <div style={blogStyle} className='blogExtended'>
      <div>
        {blog.title}, {blog.author}
        <button onClick={toggleView}>hide</button>
      </div>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>likes: {blog.likes} <button onClick={() => { likeBlog(blog) }}>like</button></div>
      <div>{blog.user.name}</div>
      {canDelete && <button onClick={() => deleteBlog(blog)}>delete</button>}
    </div>
  )
}

export default Blog