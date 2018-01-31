import React, { Component } from 'react';

class SinglePostPage extends Component {
  constructor() {
    super();
    this.state = {
      onePost: []
    }
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

  render() {
    return (
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <img height="150px" width="150px" src={ this.state.onePost.thumbnail_image_url }/>
                </div>
                <div className="col-md-8">
                  <h2>{ this.state.onePost.title }</h2>
                  <p>{ this.state.onePost.content}</p>
                </div>
              </div>
                {/* <p>Comments: { this.state.onePost.comments}</p> */}
                <h2>Comments:</h2>
                <ul>
                { (this.state.onePost.comments) && this.state.onePost.comments.map(comment => {
                      return <li>{ comment.content }, { comment.votes }</li>
                    })
                }
              </ul>
          </div>

    );
  }
}

export default SinglePostPage;
