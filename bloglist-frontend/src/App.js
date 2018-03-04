import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            user: null,
            loginuser: '',
            loginpass: ''
        }
    }

    componentDidMount() {
        blogService.getAll().then(blogs =>
            this.setState({blogs})
        )
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            this.setState({user})
        }
    }

    logIn = async (event) => {
        //Handle login
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: this.state.loginuser,
                password: this.state.loginpass
            })
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            this.setState({username:'', password:'', user})
        } catch (e) {
            this.setState({error: 'virheelliset kredentiaalit'})
        }
        setTimeout(() => {
            this.setState({ error: null})
        }, 5000)
    }

    handleLoginFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    logout = () => {
        window.localStorage.removeItem('loggedUser')
        this.setState({user: null})
        blogService.setToken(null)
    }

    loggedIn = () => (
        <div>{this.state.user.name} logged in <button onClick={this.logout}>kirjaudu ulos</button></div>
    )

    render() {
        if (this.state.user === null) {
            return (
                <LoginForm state={this.state} logIn={this.logIn}
                           handleLoginFieldChange={this.handleLoginFieldChange}/>
            )
        }
        return (
            <div>
                <h2>blogs</h2>
                <Notification msg={this.state.error} />
                {this.state.user !== null && this.loggedIn()}
                <BlogForm />
                {this.state.blogs.map(blog =>
                    <Blog key={blog._id} blog={blog}/>
                )}
            </div>
        );
    }
}

export default App;
