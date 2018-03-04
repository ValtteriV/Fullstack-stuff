import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          blog: props.blog,
          toggled: false
      }
  }

  toggleStuff = (event) => {
      this.setState({toggled: !this.state.toggled})
  }

  likeStuff = () => {
      this.setState({blog: {...this.state.blog._doc, likes: this.state.blog.likes + 1}})
      blogService.update(this.state.blog._id, this.state.blog)
  }

  short = () => (
      <div onClick={this.toggleStuff}>{this.state.blog.title} {this.state.blog.author}</div>
  )

    long = () => (
        <div onClick={this.toggleStuff}>{this.state.blog.title} {this.state.blog.author}
            <a href={this.state.blog.url}>{this.state.blog.url}</a>
            <p>likes: {this.state.blog.likes} <button>like</button> </p>
            <p>added by {this.state.blog.user.name} </p>
        </div>
    )

  render() {
      if (this.state.toggled) {
          return this.long()
      } else {
          return this.short()
      }
  }
}

export default Blog