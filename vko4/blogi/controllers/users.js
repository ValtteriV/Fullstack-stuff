const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
    try {
        const body = req.body

        const existingUser = await User.find({username: body.username})
        if (existingUser.length>0) {
            return res.status(400).json({ error: 'username must be unique' })
        }

        if (body.password.length<3) {
            return res.status(400).json({error: 'password must be at least 3 characters long'})
        }
        const saltRounds= 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            adult: body.adult,
            passwordHash
        })

        const savedUser = await user.save()

        res.json(User.format(savedUser))
    } catch (exception) {
        console.log(exception)
        res.status(500).json({ error: 'something went wrong...' })
    }
})

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users.map(User.format))
})

module.exports = usersRouter