import React, { Component } from 'react';
import './styles/App.scss';
import HomePage from "../containers/home";
import { Route, Switch } from 'react-router-dom';
import Header from './base/Header';
import Login from '../containers/LoginContainer';
import SignUp from '../containers/SignUp';
import PasswordReset from './auth/passwordReset';
import PasswordResetForm from './auth/PasswordResetForm';
import Article from '../containers/articles/Article';
import ArticlesView from './articles/ArticlesView';
import ArticleView from './articles/ArticleView';
import Profile from '../containers/ProfileContainer';
import AuthRequiredRoute from './base/AuthRequiredRoute';

class App extends Component {
  componentWillMount() {
    const { getUserFromToken } = this.props;
    getUserFromToken();
  }

  render() {
    const { history } = this.props;
    return (
      <div className="App">
        <Header history={history} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/reset_password" component={PasswordReset} />
          <Route path="/redirect_passwordReset" component={PasswordResetForm} />
          <AuthRequiredRoute path="/article-create" component={Article} />
          <Route exact path="/articles" component={ArticlesView} />
          <Route path="/articles/:slug" component={ArticleView} />
          <Route path="/profile/:username" component={Profile} />
          <AuthRequiredRoute path="/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}

export { App as default };
