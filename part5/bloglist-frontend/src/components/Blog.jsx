import { useState } from 'react'

const Blog = ({ blog }) => {
  const [view, setView] = useState(false) 

  const blogStyle = {
    border: '1px solid black',
    padding: 5,
    margin: '5px 0px',

  }

  const toggleView = () => {setView(!view)}

  if(!view){
    return(
      <div style={blogStyle}>
        {blog.title}, {blog.author}
        <button onClick={toggleView}>view</button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={toggleView}>hide</button>
      </div>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>likes: {blog.likes}</div>
      <div>{blog.author}</div>
    </div>
  )
}

export default Blog