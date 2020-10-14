const { buildSchema } = require("graphql")

module.exports = buildSchema(`

  type Author {
    _id: ID!
    title: String!
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
    createdAt: String!
  }


  input BookInput {
    title: String!
    body: String!
    authorIds: [String]!
  }

  type Query {
    authors:[Author!]
    books:[Book!]
    booksByAuthorIds (authorId: String):[Book!]
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