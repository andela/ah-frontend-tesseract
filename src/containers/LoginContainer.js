import React from "react";
import LoginForm from "../components/auth/Login";
import PropTypes from "prop-types";
import { handleLoginResponse, handleSocialResponse } from "../actions";
import { connect } from "react-redux";
import SocialButtons from "../components/auth/SocialButtons";

import Popup from "../components/base/Popup";
import LoadingGif from "../static/giphy.gif";

export class Login extends React.Component {
  loginUser = async user_data => {
    await this.props.handleLoginResponse(user_data);

    if (this.props.auth.token) this.props.history.push("/");
    else if (this.props.error) {
      this.errorElem.textContent = this.props.error.errors.error;
    }
  };

  renderSocialButtons = () => {
     return ( <div>
      {!this.props.fetchStatus ? (
          <div className="social container">
            <SocialButtons
              handleSocialResponse={this.props.handleSocialResponse}
              history={this.props.history}
            />
          </div>
        ) : (
          <div className="pop-up">
            <Popup
              history={this.props.history}
              loading={LoadingGif}
              message={"Please wait"}
            />
          </div>
        )}
        </div>
     )
  };

  render() {
    return (
      <div className="container z-depth-2" id={"login-container"}>
        <h1 className="blue-grey-text center subheader">Login</h1>
        <div className="col s9 m9 l6 offset-m2">
          <div className="row">
            <LoginForm
              login={this.loginUser}
              fetchStatus={this.props.fetchStatus}
            />
          </div>
          <p ref={p => (this.errorElem = p)} style={{ color: "red" }} />
        </div>
          {this.renderSocialButtons()}
        <div />
      </div>
    );
  }
}

Login.propTypes = {
  handleLoginResponse: PropTypes.func.isRequired,
  handleSocialResponse: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

const mapStateToProps = state => {
  return {
    auth: state.authentication.userDetails,
    error: state.authentication.login_error,
    fetchStatus: state.authentication.isFetching
  };
};

export default connect(
  mapStateToProps,
  { handleLoginResponse, handleSocialResponse }
)(Login);
