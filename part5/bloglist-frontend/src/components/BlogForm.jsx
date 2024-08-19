const BlogForm = ({ addBlog }) => {
    const createBlog = async (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const formDataObj = Object.fromEntries(formData.entries())

        await addBlog(formDataObj)
    }


    return (
        <form onSubmit={createBlog}>
            <div>
                title
                <input
                    type='text'
                    name='title'
                />
            </div>
            <div>
                author
                <input
                    type='text'
                    name='author'
                />
            </div>
            <div>
                url
                <input
                    type='url'
                    name='url'
                />
            </div>
            <button type='submit'>create</button>
        </form>
    )
}

export default BlogForm