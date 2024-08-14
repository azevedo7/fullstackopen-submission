const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((acc, curr) => acc + curr.likes, 0)

const favoriteBlog = (blogs) =>
    blogs.length === 0
    ? null
    : blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}