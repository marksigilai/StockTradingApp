import React, { Component } from 'react';
import auth from '../../Helper/auth'
import './login.css'


class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            err:"",
            authenticated:"",
        }

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    validateForm = () => {

        if(this.state.password.length < 6){
            this.setState({
                err: 'password length should be > 6'
            })
            return false;
        }

        if(this.state.email1 !== this.state.email2){
            this.setState({
                err: 'emails do not match'
            })
            return false;
        }
        
        return true;
    }

    

    handleSubmit = (event) => {

        event.preventDefault();
        
        if(!this.validateForm()){
            return;
        }


        auth.login(this.state.username, this.state.password).then((message) => {
            console.log(message);

            if(message.authenticated){
                this.setState({
                    authenticated: true,
                    err:""
                });

                this.props.setToken(message.data.token)
            }
            else{
                this.setState({
                    authenticated: false,
                    err: message.error
                });
            }
            
        });

    }

    myChangeHandler = (event) => {

        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});

    }

  
    render() {


        return (

            <form className="Login" onSubmit={this.handleSubmit}>

                <h2 className="Login-header">Log in</h2>
                
                <div className="Login-container">
                    <label className="Login-label">Email</label>
                    <input className="Login-input" type="email" placeholder="Enter your email" name='username' onChange={this.myChangeHandler}></input>
                </div>

                <div className="Login-container">
                    <label className="Login-label">Password</label>
                    <input className="Login-input" type="password" placeholder="Enter your password" name='password' onChange={this.myChangeHandler}></input>
                </div>
                
                <div className="Login-container">
                    <button type="submit" className="Login-submitBtn">Sign In</button>
                </div>


                <div>
                    {this.state.err}
                </div>


            </form>

        );
    }

}

  
  export default Login;