const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

let mongoUrl = 'mongodb://localhost/bloglist'


mongoose.connect(mongoUrl).then(() => console.log('WE IN BOIS')).catch(e => console.log(e))


const PORT = 3003
const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

server.on('close', () => {
    mongoose.connection.close()
})

module.exports = {
    app, server
}