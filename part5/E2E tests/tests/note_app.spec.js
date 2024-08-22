const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Note app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users/', {
            data: {
                name: 'joao',
                username: 'admin',
                password: 'password'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('front page can be opened', async ({ page }) => {
      const locator = await page.getByText('Notes')
      await expect(locator).toBeVisible()
      await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2023')).toBeVisible()
    })

    test('login form can be opened', async ({ page }) => {
        await page.getByRole('button', { name: 'log in'}).click()
        await page.locator('#username').fill('admin')
        await page.locator('#password').fill('password')

        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('joao logged in')).toBeVisible()
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'log in'}).click()
            await page.locator('#username').fill('admin')
            await page.locator('#password').fill('password')

            await page.getByRole('button', { name: 'login' }).click()
        })

        test('a new note can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'new note' }).click()
            await page.getByRole('textbox').fill('a note created by playwright')
            await page.getByRole('button', { name: 'save' }).click()
            await expect(page.getByText('a note created by playwright')).toBeVisible()
        })

        describe('and a note exists', () => {
            beforeEach(async ({ page }) => {
                await page.getByRole('button', { name: 'new note' }).click()
                await page.getByRole('textbox').fill('another note by playwright')
                await page.getByRole('button', { name: 'save' }).click()
            })

            test('importance can be changed', async ({ page }) => {
                await page.getByRole('button', { name: 'make not important'}).click()
                expect(page.getByText('make important')).toBeVisible()
            })
        })
    })

    test('login fails with wrong password', async ({ page }) => {
        await page.getByRole('button', { name: 'log in' }).click()
        await page.locator('#username').fill('admin')
        await page.locator('#password').fill('wrong')
        await page.getByRole('button', { name: 'login' }).click()

        // const errorDiv = await page.locator('.error')
        await expect(page.getByText('wrong credentials')).toBeVisible()

        await expect(page.getByText('joao logged in')).not.toBeVisible()
    })
  })