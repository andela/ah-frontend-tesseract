import React, { Component } from 'react';
import './App.css';
import Intro from "../intro/intro";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title">Welcome to Authors Haven</h1>
        </header>
        <Intro />
      </div>
    );
  }
}

export default App;
