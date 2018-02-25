/*const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')


const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2
    }
]

 beforeAll(async () => {
     await Blog.remove({})

     for (let blog of initialBlogs) {
         let blogObject = new Blog(blog)
         await blogObject.save()
     }
 })

test.skip('blogs are returned as json and returns blogs' , async () => {
    const blogs = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    singleblog = blogs.body[0]
    foundblog = initialBlogs.find(blog => blog.title === singleblog.title)
    expect(foundblog.likes).toBe(singleblog.likes)
})

test.skip('posting stuff get stuff into the db', async () => {
    const newBlog = {
        title: 'Hawking',
        author: 'Stephen',
        likes: 0,
        url: '127.0.0.1'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api
        .get('/api/blogs')

    const titles = response.body.map(blog => blog.title)
    expect(titles).toContain('Hawking')
})

test.skip('blog with no likes gets likes field', async () => {
    const newBlog = {
        title: 'Man',
        author: 'Macho',
        url: 'RANDYSAVAGE'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsIndb = await api
        .get('/api/blogs')
    const macho = blogsIndb.body.filter(blog => blog.author === 'Macho')

    expect(macho[0].likes).toBe(0)
})

test.skip('blog with missing fields doesnt fly', async () => {
    const newBlog = {
        title: 'I',
        author: 'suck'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

afterAll(async () => {
    await server.close()
})
*/