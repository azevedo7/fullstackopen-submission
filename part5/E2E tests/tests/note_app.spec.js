const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Note app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users/', {
            data: {
                name: 'joao',
                username: 'admin',
                password: 'password'
            }
        })

        await page.goto('/')
    })

    test('front page can be opened', async ({ page }) => {
      const locator = await page.getByText('Notes')
      await expect(locator).toBeVisible()
      await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2023')).toBeVisible()
    })

    test('login form can be opened', async ({ page }) => {
        await loginWith(page, 'admin', 'password') 
        await expect(page.getByText('joao logged in')).toBeVisible()
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'admin', 'password')
        })

        test.only('a new note can be created', async ({ page }) => {
            await createNote(page, 'a note created by playwright')
            await expect(page.getByText('a note created by playwright')).toBeVisible()
        })

        describe('and a note exists', () => {
            beforeEach(async ({ page }) => {
                await createNote(page, 'a note created by playwright')
            })

            test('importance can be changed', async ({ page }) => {
                await page.getByRole('button', { name: 'make not important'}).click()
                await expect(page.getByText('make important')).toBeVisible()
            })
        })

        describe('and several notes exists', () => {
            beforeEach(async ({ page }) => {
                await createNote(page, 'first note')
                await createNote(page, 'second note')
                await createNote(page, 'third note')
            })

            test('one of those can be made nonimportant', async ({ page }) => {
                const secondNoteElement = await page.getByText('second note').locator('..')
                await page.pause()
                await secondNoteElement.getByRole('button', { name: 'make not important' }).click()
                await expect(secondNoteElement.getByText('make important')).toBeVisible()
            })
        })
    })

    test('login fails with wrong password', async ({ page }) => {
        loginWith(page, 'admin', 'wrong')

        await expect(page.getByText('wrong credentials')).toBeVisible()
        await expect(page.getByText('joao logged in')).not.toBeVisible()
    })
  })