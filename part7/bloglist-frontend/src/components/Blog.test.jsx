import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('test that only title and author are rendered', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Robert C. Martin',
        url: 'https://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        user: {
            name: "teste"
        }
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText(`${blog.title}, ${blog.author}`, { exact: false })
    expect(element).toBeDefined()

    expect(element).not.toHaveTextContent(`${blog.url}`)
    expect(element).not.toHaveTextContent(`${blog.likes}`)
    expect(element).not.toHaveTextContent(`${blog.user.name}`)
})

test('clicking the button shows url and likes', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Robert C. Martin',
        url: 'https://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        user: {
            name: "teste",
            username: "testuser"
        }
    }    
    
    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')

    await user.click(button)


    const element = container.querySelector('.blogExtended')

    expect(element).toBeDefined()
    expect(element).toHaveTextContent(`${blog.url}`)
    expect(element).toHaveTextContent(`${blog.likes}`)
    expect(element).toHaveTextContent(`${blog.user.name}`)
})

test('like button works multiple times', async () => {
    const user = userEvent.setup()

    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Robert C. Martin',
        url: 'https://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        user: {
            name: "teste",
            username: "testuser"
        }
    }

    const eventHandler = vi.fn()

    const { container } = render(<Blog blog={blog} likeBlog={eventHandler} />)
    
    // activate view
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    //like post twice
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(eventHandler.mock.calls).toHaveLength(2)
})