import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SignUpForm from "../components/auth/SignUpForm";
import {createUser} from "../actions/signupActions";
import {connect} from "react-redux";
import {handleSocialResponse} from "../actions";
import SocialButtons from "../components/auth/SocialButtons";
import Popup from "../components/base/Popup";
import LoadingGif from "../static/giphy.gif";

export class SignUp extends Component {
    createUser = async data => {

        await this.props.createUser(data);

    };


    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-panel teal lighten-2">
                        <span className="white-text ">Create Account</span>
                    </div>
                    <SignUpForm createUser={this.createUser} user={this.props.user} loading_status={this.props.loading_status}/>

                    {this.props.fetchStatus ? (
                        <div className="pop-up">
                            <Popup history={this.props.history} message={"Please wait"} loading={LoadingGif}
                            />
                        </div>
                        ) : (
                        <div className="social container">
                            <div id="social-errors"/>
                        <SocialButtons history={this.props.history}
                        handleSocialResponse={this.props.handleSocialResponse}
                        />
                        </div>
                    )}

                </div>
            </div>
        );
    }
}

SignUp.propTypes = {
    createUser:PropTypes.func.isRequired,
    handleSocialResponse: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

const mapStateToProps = (state) => {
    return{
        user:state.create_user.user,
        error: state.create_user.creation_error,
        loading_status: state.create_user.is_loading
    }
};

export default connect(mapStateToProps,{handleSocialResponse,createUser})(SignUp);