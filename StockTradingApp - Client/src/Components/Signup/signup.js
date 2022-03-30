import React, { Component } from 'react';
import auth from '../../Helper/auth'
import './signup.css'

class Signup extends Component {

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

        auth.signup(this.state.username, this.state.email1, this.state.password).then((message) => {
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
        
        }).catch((err) => {
            console.log(err.message)
        });

    }

    myChangeHandler = (event) => {

        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});

    }
  
    render() {


        return (

            <form className="Signup" onSubmit={this.handleSubmit}>
                <h2 className="Signup-header">Sign up</h2>
                
                <div className="Signup-container">
                    <label className='Signup-label' for="username">Username</label>
                    <input name="username" placeholder="Enter your username"  type="text" className="Signup-input" onChange={this.myChangeHandler}/>
                </div>
                
                
                <div className="Signup-container">
                    <label className='Signup-label' for="signup">Email</label>
                    <input name="email1" placeholder="Enter your email"  type="email" className="Signup-input" onChange={this.myChangeHandler}/>
                </div>
                
                
                <div className="Signup-container">
                    <label className='Signup-label' for="username">Confirm Email</label>
                    <input name="email2" placeholder="Confirm your email"  type="email" className="Signup-input" onChange={this.myChangeHandler}/>
                </div>
                

                <div className="Signup-container">
                    <label className='Signup-label' for="username">Password</label>
                    <input name="password" placeholder="Enter your password" type="password" className="Signup-input" onChange={this.myChangeHandler}/>
                </div>


                <div className="Signup-container">
                    <button className="Signup-submitBtn" type="submit">Register</button>
                </div>

                <div> {this.state.err} </div>
            </form>

        );
        
    }
  }
  
  export default Signup;






