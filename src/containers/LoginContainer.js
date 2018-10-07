import React from "react";
import LoginForm from "../components/auth/Login";
import PropTypes from "prop-types";
import { handleLoginResponse, handleSocialResponse } from "../actions";
import { connect } from "react-redux";
import SocialButtons from "../components/auth/SocialButtons";
import { Link } from 'react-router-dom';

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
            <Popup
              history={this.props.history}
              loading={LoadingGif}
              message={"Please wait"}
            />
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
            <p><Link to='/reset_password' className="waves-effect">Forgot password ?</Link></p>
        </div>
          <div id={'social-error'}/>
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

export const mapStateToProps = state => {
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
