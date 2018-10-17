/* eslint-disable jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control,
react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import { validate } from './formValidation';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === 'email') this.setState({ email: event.target.value });
    else if (event.target.name === 'password') this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { login } = this.props;

    if (validate(this.formEl)) {
      login({ user: { ...this.state } });
    }
  }

  render() {
    const { fetchStatus } = this.props;
    const { handleChange } = this;
    return (
      <form
        ref={(form) => { this.formEl = form; }}
        className="col s8 m7 l6 offset-s2 offset-m3 offset-l3"
        onSubmit={this.handleSubmit}
        noValidate
      >
        <EmailInputField handleChange={handleChange} />

        <PasswordInputField handleChange={handleChange} />

        <div>
          <strong className="left">Note:</strong>
          <br />
          <small className=" left form-text text muted">
                        The email must be in the correct format e.g abc@gmail.com
          </small>
          <br />
          <small className="left form-text text muted">
            The password must be at least 8 characters long and contain numbers and letters
          </small>
        </div>

        <LoginButton fetchStatus={fetchStatus} />
      </form>
    );
  }
}

const LoginButton = ({ fetchStatus }) => (
  <div className="col s12 social" style={{ paddingTop: '20px' }}>
    {fetchStatus
      ? (
        <button type="submit" className="row waves-effect waves-light btn disabled">
                    Logging In ...
        </button>
      )
      : (
        <button type="submit" className="row waves-effect waves-light btn login-button">
                    Login
        </button>
      )
            }
  </div>

);

const EmailInputField = ({ handleChange }) => (
  <div className="input-field">
    <i className="material-icons prefix">email</i>
    <input
      id="email"
      type="email"
      className="validate"
      name="email"
      onChange={handleChange}
      required
    />
    <label htmlFor="email">
                Enter your email address
    </label>
    <div className="invalid-feedback" style={{ color: 'red' }} />
  </div>

);

const PasswordInputField = ({ handleChange }) => (
  <div className="input-field">
    <i className="material-icons prefix">lock</i>
    <input
      id="password"
      type="password"
      name="password"
      className="validate"
      onChange={handleChange}
      minLength={8}
      pattern="(?=.*\d)(?=.*[a-z]).{8,}"
      required
    />
    <label htmlFor="password">Enter your password</label>
    <div className="invalid-feedback" style={{ color: 'red' }} />
  </div>
);

LoginButton.propTypes = {
  fetchStatus: PropTypes.bool.isRequired,
};
PasswordInputField.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
EmailInputField.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

LoginForm.propTypes = {
  fetchStatus: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

export default LoginForm;
