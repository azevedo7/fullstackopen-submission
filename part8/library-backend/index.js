const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { GraphQLError } = require("graphql")
const mongoose = require("mongoose")
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")
const jwt = require("jsonwebtoken")

require("dotenv").config()

const MONGODB_URI = process.env.MONGODB_URI

console.log("connecting to", MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
  })

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
]

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    id: ID!,
    genres: [String!]!
  }

  type Author {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int!
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token

    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ): Book
    editAuthor(
        name: String!,
        setBornTo: Int!
    ): Author
  }
`

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
    bookCount: (root) => {
      return books.filter((book) => book.author === root.name).length
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
