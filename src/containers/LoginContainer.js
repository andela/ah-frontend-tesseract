import React from "react";
import LoginForm from "../components/auth/Login";
import PropTypes from 'prop-types';
import {handleLoginResponse} from "../actions";
import {connect} from "react-redux";

export class Login extends React.Component {
    loginUser = async user_data => {

        await this.props.handleLoginResponse(user_data);

        if (this.props.auth.token) this.props.history.push("/");
        else if (this.props.error) {
            this.errorElem.textContent = this.props.error.errors.error;
        }
    };

    render() {
        return (
            <div className="container z-depth-2">
                <h1 className="blue-grey-text center subheader">Login</h1>
                    <div className="col s9 m9 l6 offset-m2">
                        <div className="row">
                            <LoginForm login={this.loginUser} fetchStatus={this.props.fetchStatus}/>
                        </div>
                        <p ref={p => this.errorElem = p} style={{color: 'red'}}/>
                    </div>
            </div>
        );
    }
}

Login.propTypes = {
    handleLoginResponse: PropTypes.func.isRequired,
    history: PropTypes.shape ({
        push: PropTypes.func.isRequired
    }),

};

const mapStateToProps = (state) => {
    return {
        auth: state.authentication.userDetails,
        error: state.authentication.login_error,
        fetchStatus: state.authentication.isFetching
    }
};

export default connect(mapStateToProps, {handleLoginResponse})(Login);