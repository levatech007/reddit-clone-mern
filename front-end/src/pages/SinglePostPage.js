import React, { Component } from 'react';

class SinglePostPage extends Component {
  constructor() {
    super();
    this.state = {
      onePost: [],
    }
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    console.log(params.post_id)
    fetch(`http://localhost:8080/api/posts/${params.post_id}`)
    .then((res) => {
      return res.json(); // res cannot be read, need to convert to json
    }).then((json) => {
        console.log(json)
        this.setState({ onePost: json })
      });
  }

  onCommentSubmit(e) {
    e.preventDefault();
    const { match: { params } } = this.props;
    console.log(this.props)
    fetch(`http://localhost:8080/api/posts/${params.post_id}/comments`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: this.refs.content.value,
        votes: 0,
      })
    }).then((res) => {
        return res.json()
    }).then((json) => {
      console.log(json)
      this.setState({ onePost: { comments: this.state.onePost.comments.concat(json)} });
      this.refs.content.value = ""
    });
  }

  render() {
    return (
            <div className="container">
              <div className="row">
                <div className="col-md-3">
                  <img height="150px" width="150px" src={ this.state.onePost.thumbnail_image_url }/>
                </div>
                <div className="col-md-9">
                  <h2>{ this.state.onePost.title }</h2>
                  <p>{ this.state.onePost.content}</p>
                </div>
              </div>
              <div className="row">
                <h2>Comments:</h2>
                <ul>
                { (this.state.onePost.comments) && this.state.onePost.comments.map(comment => {
                      return <li key={comment._id}>{ comment.content }, { comment.votes }</li>
                    })
                }
                </ul>
              </div>
              <h2>Add a new comment:</h2>
              <div className="row justify-content-md-center">
                <form className="form-group" onSubmit={ this.onCommentSubmit } >
                  <textarea className="form-control" type="text" placeholder="Add a comment" ref="content"/>
                  <button className="btn btn-primary">Add comment</button>
                </form>
              </div>
          </div>
    );
  }
}

export default SinglePostPage;
