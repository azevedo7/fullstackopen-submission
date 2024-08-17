const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "Getting Started with React",
    author: "John Doe",
    url: "https://example.com/react-start",
    likes: 15
  },
  {
    title: "Node.js Best Practices",
    author: "Jane Smith",
    url: "https://example.com/nodejs-best-practices",
    likes: 7
  },
  {
    title: "Introduction to GraphQL",
    author: "Bob Johnson",
    url: "https://example.com/graphql-intro",
    likes: 23
  }
];

const usersToAdd = [
  {
    username: "johndoe",
    name: "John Doe",
    passwordHash: "secret"
  },
  {
    username: "janedoe",
    name: "Jane Doe",
    passwordHash: "anothersecret"
  }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { initialBlogs, blogsInDb, usersToAdd, usersInDb }