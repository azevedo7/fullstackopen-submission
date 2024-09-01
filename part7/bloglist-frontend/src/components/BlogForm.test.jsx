import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    // render the blogForm
    // input the details
    // press the button
    // check createBlog mock function for data

    render(<BlogForm addBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    
    await user.type(titleInput, 'this is a title')
    await user.type(authorInput, 'author name')
    await user.type(urlInput, 'http://testurl.com')
    
    const formButton = screen.getByRole('button', { name: /create/i })
    await user.click(formButton)
    
    expect(createBlog).toHaveBeenCalledTimes(1)  
    expect(createBlog).toHaveBeenCalledWith({
        title: 'this is a title',
        author: 'author name',
        url: 'http://testurl.com'
    })      

})