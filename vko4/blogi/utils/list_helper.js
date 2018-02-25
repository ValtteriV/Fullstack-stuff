const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const compareFunc = (a , b) => {
        return b.likes - a.likes
    }
    blogs.sort(compareFunc)
    return blogs[0]
}

const mostBlogs = (blogs) => {
    authors = []
    const mapper = (blog) => {
        const finder = (author) => {
            return author.author === blog.author
        }
        author = authors.find(finder)
        if (author === undefined){
            author = {author: blog.author, blogs: 0}
        }
        author.blogs = author.blogs + 1
        authors = authors.filter(oldauthor => oldauthor.author !== author.author).concat(author)
    }
    blogs.map(mapper)
    const sorter = (a, b) => {
        return b.blogs - a.blogs
    }
    return authors.sort(sorter)[0]
}

const mostLikes = (blogs) => {
    authors = []
    const mapper = (blog) => {
        const finder = (author) => {
            return author.author === blog.author
        }
        author = authors.find(finder)
        if (author === undefined){
            author = {author: blog.author, likes: 0}
        }
        author.likes = author.likes + blog.likes
        authors = authors.filter(oldauthor => oldauthor.author !== author.author).concat(author)
    }
    blogs.map(mapper)
    const sorter = (a, b) => {
        return b.likes - a.likes
    }
    return authors.sort(sorter)[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}