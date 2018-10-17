import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignUpForm from '../components/auth/SignUpForm';
import { createUser } from '../actions/signupActions';
import { handleSocialResponse } from '../actions';
import SocialButtons from '../components/auth/SocialButtons';
import Popup from '../components/base/Popup';

export class SignUp extends Component {
    createUser = async (data) => {
      await this.props.createUser(data);
    };


    render() {
        return (<div className="container">
            <div className="card">
                <div className="card-panel teal lighten-2">

                    {this.props.user && this.props.user.token ?
                        <span
                            className="white-text">Account created successfully. Check your email for account activation link</span>
                        : (
                            <span className="white-text"> Create Account</span>
                        )
                    }

                </div>

                {!this.props.user.token &&
                    <SignUpForm createUser={this.createUser} user={this.props.user}
                                fetchStatus={this.props.fetchStatus} creation_error={this.props.creation_error}/>
                }

                < DisplaySocialButtons fetchStatus={this.props.fetchStatus} user={this.props.user} handleSocialResponse={this.props.handleSocialResponse} history={this.props.history} />


            </div>
        </div>);
    }
}

const DisplaySocialButtons =(props)=>{

        if (props.fetchStatus)
            return (
            <div className="pop-up">
                <Popup history={props.history} />
            </div>
            );

        else if (!props.user.token)
            return(

                <div className="social">
                    <div id="social-errors"/>
                    <SocialButtons history={props.history}
                                   handleSocialResponse={props.handleSocialResponse}
                    />
                </div>
            );
        else
            return null

};

SignUp.propTypes = {
  createUser: PropTypes.func.isRequired,
  handleSocialResponse: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

const mapStateToProps = (state) => {
    return{
        user:state.create_user.user,
        fetchStatus: state.create_user.isFetching,
        creation_error:state.create_user.creation_error
    }
};

export default connect(mapStateToProps, { handleSocialResponse, createUser })(SignUp);
