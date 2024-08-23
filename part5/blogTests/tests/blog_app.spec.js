const { test, expect, beforeEach, describe } = require('@playwright/test')


describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Log in to application' })).toBeVisible()
        await expect(page.getByText('username')).toBeVisible()
        await expect(page.getByText('password')).toBeVisible()
    })

    describe('Login', () => {
        beforeEach(async({ page, request }) => {
            // Reset database
            await request.post('/api/testing/reset')
            // Create user
            await request.post('/api/users/', {
                data: {
                    username: 'admin',
                    name: 'user',
                    password: 'password'
                }
            })
        })

            test('succeeds with correct credentials', async({ page }) => {
                await page.getByLabel('username').fill('admin')
                await page.getByLabel('password').fill('password')
                await page.getByRole('button', { name: 'login' }).click()
                
                await expect(page.getByText('admin logged in')).toBeVisible()
            })

            test('fails with wrong credentials', async({ page }) => {
                await page.getByLabel('username').fill('admin')
                await page.getByLabel('password').fill('wrong')
                await page.getByRole('button', { name: 'login'}).click()

                await expect(page.getByText('wrong username or password')).toBeVisible()
            })

    })
})