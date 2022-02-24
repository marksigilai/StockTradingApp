import React, { Component } from 'react';
import auth from '../../Helper/auth'

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
        if(!this.state.authenticated){

            return (

                <form onSubmit={this.handleSubmit}>
                    <h1>Sign up </h1>
                    
                    <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Your name </label>
                    
                    <input name="username" type="text" id="defaultFormRegisterNameEx" className="form-control" onChange={this.myChangeHandler}/>
                    <br />
                    
                    <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">Your email</label>
                    
                    <input name="email1" type="email" id="defaultFormRegisterEmailEx" className="form-control" onChange={this.myChangeHandler}/>
                    <br />
                    
                    <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">Confirm your email</label>
                    
                    <input name="email2" type="email" id="defaultFormRegisterConfirmEx" className="form-control" onChange={this.myChangeHandler}/>
                    <br />

                    <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text"> Your password </label>
                    
                    <input name="password" type="password" id="defaultFormRegisterPasswordEx" className="form-control" onChange={this.myChangeHandler}/>

                    <div className="text-center mt-4">
                        <button color="unique" type="submit">Register</button>
                    </div>

                    <div> {this.state.err} </div>
                </form>

            );
        }
        else{
            return(

                <div>Signed up successfully</div>

            );
        }
    }
  }
  
  export default Signup;






