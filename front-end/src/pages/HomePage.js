import React, { Component } from 'react';

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      allPosts: []
    }
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
      <div>
        {
          this.state.allPosts.map((eachPost, idx) => {
            return <div key={ idx }>
                      <h2>{ eachPost.title }</h2>
                      <p>{ eachPost.content }</p>
                    </div>
          })
        }
      </div>
    );
  }
}

export default HomePage;
