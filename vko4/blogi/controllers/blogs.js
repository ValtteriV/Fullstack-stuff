const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}



blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, adult: 1})
        response.json(blogs)
    } catch (e) {
        console.log(e)
        response.status(500).send({error: 'something went wrong'})
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    try {
        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, "maenjaksa")

        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        if (body.content === undefined) {
            return response.status(400).json({ error: 'content missing' })
        }

        const user = await User.findById(decodedToken.id)
        const blog = new Blog({
            author: body.author,
            title: body.title,
            url: body.url,
            likes: body.url,
            user
        })
        if (blog.author === undefined | blog.title === undefined | blog.url === undefined) {
            return response.status(400).send({error: 'the body is not full'})
        }
        const result = await blog.save()
        response.status(201).json(result)
    } catch (e) {
        console.log(e)
        response.status(500).send({error: 'something went wrong'})
    }

})

blogsRouter.delete('/:id', async (req, res) => {
    try {
        const result = await Blog.findByIdAndRemove({_id: req.params.id})
        response.status(204).end()
    } catch (e){
        response.status(400).send({error: 'malformatted id'})
    }
})

blogsRouter.put('/:id', async (req, res) => {
    try {
        const result = await Blog.findByIdAndUpdate(req.params.id, res.body)
        response.status(204).json(result.body)
    } catch (e) {
        response.status(400).send({error: 'malformatted id'})
    }
})

module.exports = blogsRouter