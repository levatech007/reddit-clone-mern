import React, { Component } from 'react';
import SinglePostPage from './SinglePostPage'
import { Link } from 'react-router-dom'

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      allPosts: [],
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onDeletePost = this.onDeletePost.bind(this);
  }

  onDeletePost(post_id) {
    //make delete request to http://localhost:8080/api/posts/${post_id}
    fetch(`http://localhost:8080/api/posts/${post_id}`, {
      method: 'DELETE'
    }).then((res) => {
      let allPosts = this.state.allPosts.filter((onePost) => {
        return onePost._id !== post_id
        // or return oneTodo._id !== toBeDeleted._id
      })
      this.setState({ allPosts: allPosts })
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:8080/api/posts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.refs.title.value,
        content: this.refs.content.value,
        thumbnail_image_url: this.refs.imageUrl.value,
        votes: 0,
        comments: []
      })
    }).then((res) => {
        return res.json()
    }).then((json) => {
      this.setState({ allPosts: this.state.allPosts.concat([json]) });
      this.refs.title.value = ""
      this.refs.content.value = ""
      this.refs.imageUrl.value = ""
    });
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/posts').then((res) => {
      return res.json(); // res cannot be read, need to convert to json
    }).then((json) => {
      this.setState({ allPosts: json })
    });
  }

  render() {
    return (
      <div className="container">
        {
          this.state.allPosts.map((eachPost) => {
            return <div className="row" key={ eachPost._id }>
                        <img height="30px" width="30px" src={ eachPost.thumbnail_image_url }/>
                        <Link to={ `/posts/${ eachPost._id }`}>
                          <h2>{ eachPost.title }</h2>
                        </Link>
                        <button className="btn btn-primary" type="submit" onClick={ () => {this.onDeletePost(eachPost._id)} } >X</button>
                    </div>
          })
        }
        <div className="row justify-content-md-center">
          <form className="form-group" onSubmit={ this.onFormSubmit } >
            <input className="form-control" type="text" placeholder="Post title" ref="title"/>
            <textarea className="form-control" type="text" placeholder="Post content" ref="content"/>
            <input className="form-control" type="text" placeholder="Post image url" ref="imageUrl"/>
            <button className="btn btn-primary">Add post</button>
          </form>
        </div>
      </div>
    )
  }
}

export default HomePage;
