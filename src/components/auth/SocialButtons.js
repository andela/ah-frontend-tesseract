import React from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import TwitterLogin from "react-twitter-auth";
import ReactDOM from "react-dom";
import Popup from "../base/Popup";
import {TWITTER_LOGIN_URL, TWITTER_REQUEST_URL} from "../../globals";

class SocialButtons extends React.Component {

    onSuccess = provider => async response => {
    // calls the handleResponse action creator
    await this.props.handleSocialResponse(response, provider);
    // redirect user on successful successful login
    // render popup on failure to login from the API
    const message = "Failed to login with " + provider;
    {
      localStorage.getItem("token")
        ? this.props.history.push("/")
        : this.renderPopupComponent(message);
    }
  };

  onLoginFailure = () => {
    // Handles a failure from  the social providers (Facebook, Google,Twitter)
    const message = "Failed to login with that social media platform";
    this.renderPopupComponent(message);
  };

    renderPopupComponent = message => {
    ReactDOM.render(
      <Popup history={this.props.history} message={message} />,
      document.getElementById("login-container")
    );
  };
  renderFacebook = () => {
    return (
      <FacebookLogin
        id={"facebook"}
        cssClass="waves-effect btn light-blue darken-4"
        icon={"fa-facebook left"}
        appId="2245533468868650"
        fields="name,email,picture"
        callback={this.onSuccess("facebook")}
      />
    );
  };

  renderGoogle = () => {
    return (
      <GoogleLogin
        className=" waves-effect btn red darken-1"
        id={"google"}
        clientId="1007255369173-nbmb7rajc6nlbmagiqf749865ua33uh5.apps.googleusercontent.com"
        onSuccess={this.onSuccess("google-oauth2")}
        onFailure={this.onLoginFailure}
      >
        <i className="fa fa-google left" />
        Sign up with google
      </GoogleLogin>
    );
  };
  renderTwitter = () => {
    return (
      <TwitterLogin
        className=" twitter waves-effect btn row light-blue"
        id={"twitter"}
        loginUrl={TWITTER_LOGIN_URL}
        onSuccess={this.onSuccess("twitter")}
        onFailure={this.onLoginFailure}
        requestTokenUrl={TWITTER_REQUEST_URL}
      >
        <i className="fa fa-twitter left" />
        Sign up with twitter
      </TwitterLogin>
    );
  };

  render() {
    return (
      <div>
        {this.renderFacebook()} <br />
        <br />
        {this.renderGoogle()} <br />
        <br />
        {this.renderTwitter()} <br />
        <br />
      </div>
    );
  }
}

export default SocialButtons;
