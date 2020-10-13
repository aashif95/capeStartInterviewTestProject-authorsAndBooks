const mongoose = require("mongoose")

const Schema = mongoose.Schema

const autorSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Author", autorSchema)