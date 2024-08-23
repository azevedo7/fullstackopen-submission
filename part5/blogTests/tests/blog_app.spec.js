const { test, expect, beforeEach, describe } = require('@playwright/test')
const { addBlog, loginWith, likeBlog } = require('./helper')
const { assert } = require('console')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users/', {
            data: {
                username: 'admin',
                name: 'user',
                password: 'password'
            }
        })

        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Log in to application' })).toBeVisible()
        await expect(page.getByText('username')).toBeVisible()
        await expect(page.getByText('password')).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            loginWith(page, 'admin', 'password')
            await expect(page.getByText('admin logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            loginWith(page, 'admin', 'wrong')
            await expect(page.getByText('wrong username or password')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            loginWith(page, 'admin', 'password')
        })

        test('a new blog can be created', async ({ page }) => {
            await addBlog(page, 'test note', 'test author', 'http://example.com')

            await expect(page.getByText('a new blog test note by test author added')).toBeVisible()
            await expect(page.getByText('test note, test author')).toBeVisible()
        })

        test('a blog can be liked', async({ page }) => {
            await addBlog(page, 'blog with zero likes', 'nobody', 'http://likes.com')
            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()

            await expect(page.getByText('likes: 1')).toBeVisible()
        })

        test('a blog can be removed', async({ page }) => {
            await addBlog(page, 'bye blog', 'nobody', 'http://delete.com')
            await page.getByRole('button', { name: 'view' }).click()

            await page.getByRole('button', { name: 'delete' }).click()
            page.on('dialog', dialog => dialog.accept());
        })

        test('blogs are ordered according to likes', async({ page }) => {
            await addBlog(page, 'first blog', 'nobody', 'http://likes.com')
            await addBlog(page, 'second blog', 'nobody', 'http://likes.com')
            await addBlog(page, 'third blog', 'nobody', 'http://likes.com')
            await addBlog(page, 'fourth blog', 'nobody', 'http://likes.com')
            await addBlog(page, 'fifth blog', 'nobody', 'http://likes.com')

            await page.getByText('fifth blog, nobody').waitFor()
            
            // blog4 - 3 likes, blog2- 1 like ...
            await likeBlog(page, 'fourth blog, nobody', 3)
            await likeBlog(page, 'second blog, nobody', 1)

            expect(await page.getByTestId('blog')).toHaveCount(5)
            expect(await page.getByTestId('blog').nth(0).getByText('fourth blog, nobody')).toBeVisible()
            expect(await page.getByTestId('blog').nth(1).getByText('second blog, nobody')).toBeVisible()
        })
    })

    describe('when multiple users', () => {
        beforeEach(async ({ page, request}) => {
            await request.post('/api/users/', {
                data: {
                    username: 'user1',
                    name: 'user1',
                    password: 'password'
                }
            })
            await request.post('/api/users/', {
                data: {
                    username: 'user2',
                    name: 'user2',
                    password: 'password'
                }
            })

            await page.goto('/')
        })

        test('only the user who added the blog can delete it', async ({ page }) => {
            // user1 will add a blog and user2 will open the blog and try to remove it
            await loginWith(page, 'user1', 'password')    
            await addBlog(page, 'test note', 'test author', 'http://example.com')
            await page.getByText('test note, test author').waitFor()

            // logout
            await page.getByRole('button', { name: 'logout' }).click()

            await loginWith(page, 'user2', 'password')
            await page.getByRole('button', { name: 'view' }).waitFor()
            await page.getByRole('button', { name: 'view' }).click()

            await expect(page.getByText('delete')).not.toBeVisible()
        })
    })
})