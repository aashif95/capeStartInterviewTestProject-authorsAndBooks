
const Author = require("../../models/authors")
const Book = require("../../models/books")

module.exports = {
  authors: async () => {
    try {
      const authorsFetched = await Author.aggregate([
    {
      $lookup:
         {
            from: "book",
            localField: "_id",
            foreignField: "authorIds",
            as: "books"
        }
      }
    ])
      console.log(authorsFetched)
      return authorsFetched.map(author => {
        return {
          ...author,
          createdAt: new Date(author.createdAt).toISOString(),
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

  booksByAuthorIds: async args => {
    try {
      const booksFetched = await Book.find({authorIds: {$in: [args.authorId]}})
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

  booksByPriceRange: async args => {
    var query = {price: {$gte: args.min, $lte: args.max}}
    if (args.min && !args.max) {
      query = {price: {$gte: args.min}}
    }
    if (!args.min && args.max) {
      query = {price: {$lte: args.max}}
    }
    try {
      const booksFetched = await Book.find(query)
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
      const { title, body, authorIds, price } = args.book
      const book = new Book({
        title,
        body,
        price,
        authorIds,
      })
      const newBook = await book.save()
      return { ...newBook._doc, _id: newBook.id }
    } catch (error) {
      throw error
    }
  },
}