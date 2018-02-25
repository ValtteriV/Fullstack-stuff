const mongoose = require('mongoose')
const Schema = mongoose.Schema


const schema = new Schema({
    title: String,
    author: String,
    url: String,
    likes: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})
const Blog = mongoose.model("Blog", schema)

module.exports = Blog