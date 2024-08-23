const addBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'Create Blog' }).click()
    await page.getByPlaceholder('title').fill(title)
    await page.getByPlaceholder('author').fill(author)
    await page.getByPlaceholder('url').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
}

const loginWith = async (page, username, password) => {
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const likeBlog = async(page, text, times = 1) => {
    const blogDiv = await page.getByText(text)
    await blogDiv.getByRole('button', { name: 'view' }).click()
    const blogExtended = await page.locator('.blogExtended')
    for(let i = 0; i < times; i++) {
        await blogExtended.getByRole('button', { name: 'like' }).click()
        await blogExtended.getByText('likes: ', i+1).waitFor()
    }
    await blogExtended.getByRole('button', { name: 'hide' }).click()
}

export { addBlog, loginWith, likeBlog }