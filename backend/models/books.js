const mongoose = require("mongoose")

const Schema = mongoose.Schema

const booksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },
    authorIds: {
      type: Array,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Books", booksSchema)