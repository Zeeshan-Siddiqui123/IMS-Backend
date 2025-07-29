const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  link: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
  deletedAt: { type: Date, default: null }
})

module.exports = mongoose.model('post', postSchema);