import React, { Component } from 'react';
import { Link } from "react-router-dom";
import auth from '../../Helper/auth'



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

        if(!this.state.authenticated){

            return (
                <div className="login">
                        
                        <div class="vertical-container">

                            <form id='signin-form' onSubmit={this.handleSubmit}>

                                <h2>Log in</h2>
                                
                                <input type="text" placeholder="Username" name='username' onChange={this.myChangeHandler}></input>

                                <br />
                                
                                <input type="password" placeholder="Password" name='password' onChange={this.myChangeHandler}></input>

                                <br />
                                
                                <button type="submit" >Sign In</button>
                            </form>

                            <div>
                                {this.state.err}
                            </div>

                        </div>
                </div>
            );
        }

        return (
            <div>Successfully logged in </div>
        )

    }
  }
  
  export default Login;