import React, { Component } from 'react';
import './styles/App.scss';
import { Route } from 'react-router-dom';
import Header from './base/Header';
import Login from '../containers/LoginContainer';
import HomeImg from '../static/article.jpg';
import SignUp from '../containers/SignUp';
import PasswordReset from './auth/passwordReset';
import PasswordResetForm from './auth/PasswordResetForm';


class App extends Component {
  render() {
    return (

      <div className="App">
        <Header />
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/reset_password" component={PasswordReset} />
        <Route path="/redirect_passwordReset" component={PasswordResetForm} />
        <Route path="/sign-up" component={SignUp} />

      </div>
    );
  }
}

const HomePage = () => <img src={HomeImg} alt="..." className="responsive-img" />;

export { App as default, HomePage };
