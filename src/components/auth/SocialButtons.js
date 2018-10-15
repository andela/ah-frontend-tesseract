import React from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import M from "materialize-css";

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
        : M.toast({html: message,classes:"red darken-3"});
    }
  };

  onLoginFailure = () => {
    // Handles a failure from  the social providers (Facebook, Google,Twitter)
      const message = "Failed to login with that social media platform";
      M.toast({html: message,classes:"red darken-3"});
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
        className=" waves-effect btn red darken-1 google"
        id={"google"}
        clientId="1007255369173-nbmb7rajc6nlbmagiqf749865ua33uh5.apps.googleusercontent.com"
        onSuccess={this.onSuccess("google-oauth2")}
        onFailure={this.onLoginFailure}
      >
        <i className="fa fa-google left" />
        Login with google
      </GoogleLogin>
    );
  };

  render() {
    return (
        <div className="social">
            {this.renderFacebook()}
            <br />
            <br />
            {this.renderGoogle()} <br />
        </div>
    );
  }
}

export default SocialButtons;
