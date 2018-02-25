const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const User = require('../models/user')

beforeAll(async () => {
    await User.remove({})

    usr = {username: 'Macho', name: 'Man', password: 'RANDYSAVAGE'}
    usrObj = new User(usr)
    await usrObj.save()

})

test('adding a user with an existing username', async () => {
    usr = {username: 'Macho', name: 'Man', password: 'RANDYSAVAGE'}

    const res = await api
        .post('/api/users')
        .send(usr)
        .expect(400)
    expect(res.body.error).toBe('username must be unique')
})

test('adding a user with short password', async () => {
    usr = {username: 'poncho', name:'bono', password: 'as'}

    const res = await api
        .post('/api/users')
        .send(usr)
        .expect(400)

    expect(res.body.error).toBe('password must be at least 3 characters long')
})


afterAll(async () => {
    await server.close()
})
