
const Author = require("../../models/authors")
const Book = require("../../models/books")

module.exports = {
  authors: async () => {
    try {
      const authorsFetched = await Author.find()
      return authorsFetched.map(author => {
        return {
          ...author._doc,
          _id: author.id,
          createdAt: new Date(author._doc.createdAt).toISOString(),
        }
      })
    } catch (error) {
      throw error
    }
  },

  createAuthor: async args => {
    try {
      const { title } = args.author
      const author = new Author({
        title,
      })
      const newAuthor = await author.save()
      return { ...newAuthor._doc, _id: newAuthor.id }
    } catch (error) {
      throw error
    }
  },

  books: async () => {
    try {
      const booksFetched = await Book.find()
      return booksFetched.map(book => {
        return {
          ...book._doc,
          _id: book.id,
          createdAt: new Date(book._doc.createdAt).toISOString(),
        }
      })
    } catch (error) {
      throw error
    }
  },

  createBook: async args => {
    try {
      const { title, body, authorIds } = args.book
      const book = new Book({
        title,
        body,
        authorIds,
      })
      const newBook = await book.save()
      return { ...newBook._doc, _id: newBook.id }
    } catch (error) {
      throw error
    }
  },
}