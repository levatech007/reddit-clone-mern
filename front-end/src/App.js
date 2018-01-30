import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyRoutes from './config/routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">reddit</h1>
          <h2 className="App-blurb">The front page of the web</h2>
        </header>
        { MyRoutes }
      </div>
    );
  }
}

export default App;
