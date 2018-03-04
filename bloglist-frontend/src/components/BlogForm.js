import React from 'react'
import blogService from '../services/blogs'

class BlogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            author: '',
            url: ''
        }
    }

    onFormChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    submit = (event) => {
        event.preventDefault()
        blogService.newBlog({title: this.state.title, author: this.state.author, url: this.state.url})
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                <div>title: <input value={this.state.title} name='title' type='text' onChange={this.onFormChange}/></div>
                <div>author: <input value={this.state.author} name='author' type='text' onChange={this.onFormChange}/></div>
                <div>url: <input value={this.state.url} name='url' type='text' onChange={this.onFormChange}/></div>
                <button type='submit'>create</button>
            </form>
        )
    }

}

export default BlogForm