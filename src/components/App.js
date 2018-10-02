import React, { Component } from "react";
import "./styles/App.scss";
import Header from "./base/Header";
import {Route} from "react-router-dom";
import Login from "../containers/LoginContainer";
import HomeImg from "../static/article.jpg";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}

const HomePage = props => {
  return <img src={HomeImg} alt="..." className="responsive-img" />;
};

export { App as default, HomePage };
