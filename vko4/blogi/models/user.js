const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    username: String,
    name: String,
    passwordHash: String,
    adult: {type: Boolean, default: true}
})

schema.statics.format = (user) => {
    return {
        id: user._id,
        username: user.username,
        name: user.name,
        adult: user.adult
    }
}

const User = mongoose.model('User', schema)

module.exports = User