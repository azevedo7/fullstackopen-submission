const { GraphQLError } = require("graphql")
const jwt = require("jsonwebtoken")
const User = require("./models/user")
const Author = require("./models/author")
const Book = require("./models/book")

// Subscriptions
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()


const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filters = {}

      // if (args.author) {
      //   const author = await Author.findOne({ name: args.author })
      //   filters.author = args.author._id
      // }

      if (args.genre) {
        filters.genres = args.genre
      }

      let updatedBooks = await Book.find(filters).populate("author")
      return updatedBooks
    },
    allAuthors: async () => Author.find({}),
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ ...args })
      try {
        await user.save()
      } catch (error) {
        throw new GraphQLError("Creating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        })
      }
      return user
    },
    login: async (root, args) => {
      // check if username and password checks out
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "admin") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.SECRET) }
    },
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author })
      if(!context.currentUser){
        throw new GraphQLError('Unauthenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError("Creating author failed", {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
              http: {
                status: 500,
              },
              error,
            },
          })
        }
      }

      const book = new Book({ ...args, author })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError("Creating book failed", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            http: {
              status: 500,
            },
            error,
          },
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: (root, args, context) => {
      if(!context.currentUser){
        throw new GraphQLError('Unauthenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      let newAuthor = authors.find((a) => a.name === args.name)
      if (!newAuthor) {
        return null
      }


      newAuthor.born = args.setBornTo
      authors = authors.map((a) => (a.id === newAuthor.id ? newAuthor : a))
      return newAuthor
    },
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate("author")
      console.log(books)
      return books.filter((book) => book.author.name == root.name).length
    },
  },
  Subscription:{
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    }
  }
}



module.exports = resolvers 