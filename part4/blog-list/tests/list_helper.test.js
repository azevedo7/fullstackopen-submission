const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const demoBlogs = require('./demo_blogs')

test('dummy returns one', () => {
    const blogs = []
    assert.strictEqual(listHelper.dummy(blogs), 1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        assert.strictEqual(listHelper.totalLikes([]), 0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        assert.strictEqual(listHelper.totalLikes(demoBlogs.one), 5)
    })

    test('of a bigger list in calculated right', () => {
        assert.strictEqual(listHelper.totalLikes(demoBlogs.multiple), 36)
    })
})

describe('favoriteBlog', () => {
    test('of empty list is null', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog([]),null) 
    })

    test('when list has only one blog, equals the only blog', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(demoBlogs.one), demoBlogs.one[0])
    })

    test('of a bigger list gives the right one', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(demoBlogs.multiple), demoBlogs.multiple[2])
    })
})