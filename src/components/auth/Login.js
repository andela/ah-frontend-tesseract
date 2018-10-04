import React from 'react'


class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.name === "email")
            this.setState({email: event.target.value});
        else if (event.target.name === "password")
            this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.validate()) {
            this.props.login({'user': {...this.state}});
        }
    }

    validate = () => {
        const formLength = this.formEl.length;

        if (this.formEl.checkValidity() === false) {
            for (let i = 0; i < formLength; i++) {
                const elem = this.formEl[i];
                const errorLabel = elem.parentNode.querySelector('.invalid-feedback');

                if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
                    if (!elem.validity.valid) errorLabel.textContent = elem.validationMessage;
                    else errorLabel.textContent = '';
                }
            }

            return false;
        }
        else {

            for(let i = 0; i < formLength; i++) {
                const elem = this.formEl[i];
                const errorLabel = elem.parentNode.querySelector('.invalid-feedback');
                if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
                    errorLabel.textContent = '';
                }
            }

            return true;
        }
    };

    render() {
        return (
            <form ref={form => this.formEl = form}
                  className="col s8 m7 l6 offset-s2 offset-m3 offset-l3"
                  onSubmit={this.handleSubmit}
                  noValidate>
                <EmailInputField handleChange={this.handleChange}/>

                <PasswordInputField handleChange={this.handleChange}/>

                <div>
                    <strong className={"left"}>Note:</strong>
                    <br/>
                    <small className={" left form-text text muted"}>
                        The email must be in the correct format e.g abc@gmail.com
                    </small>
                    <br/>
                    <small className={"left form-text text muted"}>
                        The password must be at least 8 characters long and contain numbers and letters
                    </small>
                </div>

                <LoginButton fetchStatus={this.props.fetchStatus}/>
            </form>
        );
    }
}

const LoginButton = (props) => {
    return (
        <div className="col s12 social" style={{paddingTop: "20px"}}>
            {props.fetchStatus ?
                <button type="submit" className={"row waves-effect waves-light btn disabled"}>
                    Logging In ...
                </button>
                :
                <button type="submit" className={"row waves-effect waves-light btn login-button"}>
                    Login
                </button>
            }
        </div>
    );
};

const EmailInputField = (props) => {
    return (
        <div className="input-field">
            <i className="material-icons prefix">email</i>
            <input id="email" type="email" className="validate" name="email" onChange={props.handleChange} required/>
            <label htmlFor="email">
                Enter your email address
            </label>
            <div className={"invalid-feedback"} style={{color: 'red'}}/>
        </div>

    );
};

const PasswordInputField = (props) => {
    return (
        <div className="input-field">
            <i className="material-icons prefix">lock</i>
            <input
                id="password"
                type="password"
                name="password"
                className="validate"
                onChange={props.handleChange}
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                required
            />
            <label htmlFor="password">Enter your password</label>
            <div className={"invalid-feedback"} style={{color: 'red'}}/>
        </div>
    );
};

export default LoginForm;