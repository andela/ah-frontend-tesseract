import React, { Component } from 'react';
import './styles/App.scss';
import Header from "./base/Header";
import {Route} from "react-router-dom";
import Login from "../containers/LoginContainer";
import HomeImg from "../static/article.jpg";
import SignUp from "../containers/SignUp";
import PasswordReset from './auth/passwordReset';
import PasswordResetForm from './auth/PasswordResetForm';
import Article from "../containers/articles/Article";
import ArticlesView from "./articles/ArticlesView";
import ArticleView from "./articles/ArticleView";

class App extends Component {
  render() {
    return (

            <div className="App">
                <Header />
                <Route exact path='/' component={this.HomePage}/>
                <Route path='/login' component={Login}/>
                <Route path='/sign-up' component={SignUp}/>
                <Route path="/reset_password" component={PasswordReset} />
                <Route path="/redirect_passwordReset" component={PasswordResetForm} />
                <Route path='/article-create' component={Article}/>
                <Route exact path='/articles' component={ArticlesView}/>
                <Route path='/articles/:slug' component={ArticleView} />
            </div>
        )
    }
}

const HomePage = () => <img src={HomeImg} alt="..." className="responsive-img" />;

export { App as default, HomePage };
