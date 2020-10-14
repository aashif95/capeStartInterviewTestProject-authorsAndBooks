const { buildSchema } = require("graphql")

module.exports = buildSchema(`

  type Author {
    _id: ID!
    title: String!
    books: [Book]!
    createdAt: String!
  }


  input AuthorInput {
    title: String!
  }

  type Book {
    _id: ID!
    title: String!
    body: String!
    authorIds: [String]!
    price: Float!
    createdAt: String!
  }


  input BookInput {
    title: String!
    body: String!
    price: Float!
    authorIds: [String]!
  }

  type Query {
    authors:[Author!]
    books:[Book!]
    booksByAuthorIds (authorId: String):[Book!]
    booksByPriceRange (min: Float, max: Float):[Book!]
  }

  type Mutation {
    createAuthor(author:AuthorInput): Author
    createBook(book:BookInput): Book
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)