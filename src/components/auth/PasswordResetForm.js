import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {handlePasswordReset} from "../../actions";
import {connect} from "react-redux";
import { validate } from './formValidation';

export class PasswordResetForm extends Component {
        state = { password:'',
                confirmPassword: '' 
                }
    
    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value });
    };
    handleSubmit = (event) =>{
        
        event.preventDefault();
            if (validate(this.formEl)){
                if (this.state.password === this.state.confirmPassword){
                    this.props.handlePasswordReset({'user':{...this.state}})

                }else{
                    const elem = this.formEl;
                    const errorLabel = elem.parentNode.querySelector('.invalid-feedback');
                    errorLabel.textContent = 'Your Passwords do not match';
                }
            }     
    };
    
    render() { 
        return ( 
                <div className="container z-depth-2">
                    <h2 className="blue-grey-text center subheader">Enter your new password</h2>
                    <div className="row">
                        <form onSubmit ={this.handleSubmit} ref={form => this.formEl = form} className="col s8 m7 l6 offset-s2 offset-m3 offset-l3" noValidate>
                            <div className="input-field">
                                <i className="material-icons prefix">lock</i>
                                <input id="password" name ='password' value= {this.state.password} onChange = {this.handleChange} type="password" className="validate" placeholder="new password" minLength={8}pattern="(?=.*\d)(?=.*[a-z]).{8,}" required />
                                <label htmlFor="password">Enter your new password</label>
                                <div className={"invalid-feedback"} style={{color: 'red'}}/>
                            </div>
                            <div className="input-field">
                            <i className="material-icons prefix">lock</i>
                                <input type="password" id="comfirmPassword" name="confirmPassword" value = {this.state.confirmPassword} onChange={this.handleChange} className="validate" placeholder="comfirm new password" minLength={8} pattern="(?=.*\d)(?=.*[a-z]).{8,}" required/>
                                <label htmlFor="comfirmPassword">Comfirm your new password</label>
                                <div className={"invalid-feedback"} style={{color: 'red'}}/>  
                            </div>
                            <ResetButton processing = {this.props.processing} handleSubmit = {this.handleSubmit} />
                            
                        </form>
                    </div>
                    <p style={{color: 'green'}}>{this.props.msg.message}</p>
                </div>);}
}
 
export const ResetButton = (props) => {
    return ( <div>
                <div>
                    <strong className={"left"}>Note:</strong>
                    <br/>
                    <small className={"left form-text text muted"}>
                        The password must be at least 8 characters long and contain numbers and letters
                    </small>
                </div>
                <div className="col s12 social" style={{paddingTop: "30px"}}>
                    {props.processing ? <button type="submit" className={"row waves-effect waves-light btn disabled"}>PROCESSING ...</button>
                        :
                        <button type = "submit" className="btn blue-grey waves-effect darken-4" onClick={props.handleSubmit}>Reset Password</button>
                        }
                </div>  
        </div> );
}
 

handlePasswordReset.propTypes = {
    handleRequestReset: PropTypes.func.isRequired
};

export const mapStateToProps = state => ({
        msg: state.confirmPasswordReset.message,
        processing: state.confirmPasswordReset.processing,
        error: state.confirmPasswordReset.error
   
});
export default connect(mapStateToProps, {handlePasswordReset})(PasswordResetForm);

