import React from 'react'
import PropTypes from 'prop-types';
import { handleRequestReset } from "../../actions";
import { connect } from "react-redux";
import { validate } from './formValidation';
import M from 'materialize-css'


export class PasswordReset extends React.Component {

    state = { email: '' };

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    };
    handleSubmit = async event => {
        const host = window.location.host + "/redirect_passwordReset"
        event.preventDefault();
        if (validate(this.formEl) ) {
           await this.props.handleRequestReset({
                'email': this.state.email,
                "callback_url": host
            });
            
            if (!this.props.processing && this.props.error){
                M.toast({html: 'This email address is not registered, please sign up ', classes: 'red darken-4', });
                }
                else if (!this.props.processing && this.props.msg.message){
                    M.toast({html: 'Please check your email for your password reset link', classes: 'green darken-4', });
            }         
        }
        
    };
  
    
    render() {
        

        return (<div className="container z-depth-2">
            <h2 className="blue-grey-text center subheader">Forgot your password ?</h2>
            <div className="row">
                <form id = "request-form" ref={form => this.formEl = form} className="col s8 m7 l6 offset-s2 offset-m3 offset-l3" noValidate>
                    <div className="input-field">
                        <i className="material-icons prefix" >email</i>
                        <input id="email" name="email" value={this.state.email} onChange={this.handleChange} type="email" className="validate" placeholder="email" required />
                        <label htmlFor="email">Enter your email</label>
                        <div className={"invalid-feedback"} style={{ color: 'red' }} />
                    </div>
                    <Button processing= {this.props.processing} handleSubmit= {this.handleSubmit}/>
                </form>
            </div>

        </div>
        );

    }
}
export const Button = (props) => {
    return ( <div>
        <div>
            <strong className={"left"}>Note:</strong>
            <br />
            <small className={" left form-text text muted"}>The email must be in the correct format e.g abc@gmail.com</small>
        </div>
        <div className="col s12 social" style={{ paddingTop: "30px" }}>
            {props.processing ?
                <button type="submit" className={"row waves-effect waves-light btn disabled"}>PROCESSING ...</button>
                :
                <button id = "request-button" type="submit" className="btn blue-grey waves-effect darken-4" onClick={props.handleSubmit}>Request password Resest</button>
            }
        </div>
        </div> );
}
 
PasswordReset.propTypes = {
    handleRequestReset: PropTypes.func.isRequired
};

export const mapStateToProps = (state)=> ({
    msg: state.passwordReset.message,
    processing: state.passwordReset.processing,
    error: state.passwordReset.error

});
export default connect(mapStateToProps, { handleRequestReset })(PasswordReset);

