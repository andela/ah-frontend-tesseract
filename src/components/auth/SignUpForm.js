import React, {Component} from 'react';

class SignUpForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            username:"",
            usernameError:"",
            email:"",
            emailError:"",
            password:"",
            passwordError:"",
            confirm:"",
            confirmError:""
        };


        this.change = this.change.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    change(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    };

    handleSubmit = e => {
        /**
         * method for handling form input after validation
         * */
        if (e) e.preventDefault();

        if (this.validate()){
            this.setState({
                usernameError:"",
                emailError:"",
                passwordError:"",
                confirmError:""
            });

            const user = { "user":{
                    "username":this.state.username,
                    "email": this.state.email,
                    "password": this.state.password
                }
            };


           this.props.createUser(user);

        }
    };


    validate = () =>{
        /*
        * method for validating form input
        *
        * */
        const {username, email, password, confirm} = this.state;
        let foundError = false;
        this.setState({
            usernameError:"",
            emailError:"",
            passwordError:"",
            confirmError:""
        });

        if (username.length === 0){
            this.setState({usernameError:"username is required"});
            foundError = true;
        }else if(username.length < 5){
            this.setState({usernameError:"username must be at least five characters"});
            foundError = true;
        }

        if (email.length === 0){
            this.setState({emailError:"email is required"});
            foundError = true;
        }else if(email.indexOf("@")===-1){
            this.setState({emailError:"invalid email"});
            foundError = true;
        }

        if (password.length=== 0 ){
            this.setState({passwordError:"password is required"});
            foundError = true;
        }else if(password.length<8){
            this.setState({passwordError:"weak password, must be at least 8 characters"});
            foundError = true;
        }else if (password.search(/\d/) === -1) {
            this.setState({passwordError:"Weak password, must have at least 1 digit"});
            foundError = true;
        }else if (password.search(/[a-zA-Z]/) === -1) {
            this.setState({passwordError:"Weak password, must have at least 1 letter"});
            foundError = true;
        }

        if (confirm.length === 0){
            this.setState({confirmError:"please confirm your password"});
            foundError = true;
        }else if (password!==confirm){
            this.setState({confirmError:"password mismatch"});
            foundError = true;
        }

        return !foundError;

    };

    create_form_inputs(){
        /*
        * method creates four form inputs basing on the objects declared in the array below
        * */
        let form_inputs = [
            {icon: 'account_circle', error:this.state.usernameError,name:"username",label:"Enter Username",value:this.state.username,type:"text"},
            {icon: 'email',value:this.state.email, error:this.state.emailError,name:"email",label:"Enter Email",type:"email"},
            {icon: 'lock', error:this.state.passwordError,name:"password",type:"password", label:"Enter Password",value:this.state.password},
            {name:"confirm",error:this.state.confirmError, icon: 'lock',value:this.state.confirm,type:"password",label:"Confirm Password"},
        ];

        let inputs = [];

        for (let i = 0; i < form_inputs.length; i++) {

            inputs.push(<InputField icon={form_inputs[i].icon} key={form_inputs[i].name}
                                    error={form_inputs[i].error} name={form_inputs[i].name} label={form_inputs[i].label}
                                    change={this.change} value={form_inputs[i].value} type={form_inputs[i].type} />)
        }

        return inputs;

    }


    render() {

        return (
                <div>

                        <div className="card-body px-lg-5 pt-0">

                            <div className="row valign-wrapper" >
                                <form onSubmit={this.handleSubmit} className="col s8 m7 l6 offset-s2 offset-m3 offset-l3"
                                      id="sign-up-form">

                                    {this.create_form_inputs()}

                                    {this.props.creation_error &&
                                        (<div className="error" >
                                            <DisplayErrors errors={this.props.creation_error} />
                                        </div>)
                                    }

                                    <SignUpButton fetchStatus={this.props.fetchStatus}/>

                                </form>
                            </div>
                        </div>
                </div>
        );
    }
}

const DisplayErrors = (props) => {
    let keys = Object.keys(props.errors);
    let message = [];
    keys.forEach( function(key) {
        message.push(<p className="error">{props.errors[key]}</p>);
    });
    return message;
};

const InputField = (props) => {
    /*
    * function used to create dynamic form fields basing on the props passed
    * */
    return (
        <div className="input-field">
            <i className="material-icons prefix">{props.icon}</i>
            <input id={props.name} name={props.name} value={props.username}
                   onChange={props.change} type={props.type} />
            <label htmlFor={props.name}>{props.label}</label>
            <div className="error">{props.error}</div>
        </div>
    )
};

const SignUpButton = (props) =>{
    /**
     * function for creating the submit button
     * */
    return(
        <div className="col s12 social" style={{paddingTop: "20px"}}>
        <button type="submit"
                    className="row btn sign-up"
                    id="submit-sign-up-form">
                {props.fetchStatus ?
                    <span>Signing up ...</span>
                    :
                    <span>Sign up </span>
                }

            </button>
        </div>
    )
};

export default SignUpForm;
