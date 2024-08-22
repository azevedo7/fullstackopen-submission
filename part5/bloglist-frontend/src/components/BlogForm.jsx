const BlogForm = ({ addBlog }) => {
  const createBlog = async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const formDataObj = Object.fromEntries(formData.entries())

    console.log('Submitting form with data:', formDataObj) // Add this line
    try {
      await addBlog(formDataObj)
      console.log('addBlog called successfully')
    } catch {
      console.error('Error calling addBlog:', error)
    }
  }


  return (
    <form onSubmit={createBlog}>
      <div>
                title
        <input
          type='text'
          name='title'
          placeholder="title"
        />
      </div>
      <div>
                author
        <input
          type='text'
          name='author'
          placeholder="author"
        />
      </div>
      <div>
                url
        <input
          type='url'
          name='url'
          placeholder="url"
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

  export default BlogForm