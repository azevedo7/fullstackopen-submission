const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((acc, curr) => acc + curr.likes, 0)

const favoriteBlog = (blogs) =>
    blogs.length === 0
    ? null
    : blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)

const mostBlogs = (blogs) => {
    // turns the array into {"name of author": number of blogs, ...}
    const countBy = _.countBy(blogs, 'author') 

    // turn authors object into array of key pairs and then by number of blogs
    const arrayAuthorBlogs = _.map(_.toPairs(countBy), ([author, count]) => {
        return {
            "author": author,
            "blogs": count
        }
    })

    // find the max by blogs and return
    return blogs.length > 0 ? _.maxBy(arrayAuthorBlogs, 'blogs') : []
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}