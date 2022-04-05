import React, { Component } from 'react';
import Login from '../../Components/Login/login'
import Signup from '../../Components/Signup/signup'
import './landing.css';



class Landing extends Component{

  constructor(){
    super();

    this.state = {
      hasAccount:true
    } 


  }

  toggleTrue = () => {

    this.setState({
      hasAccount: true
    })
  }

  toggleFalse = () => {

    this.setState({
      hasAccount: false
    })


  }

  render() {


    let content;

    if (this.state.hasAccount) {

      content = < Login setToken ={ this.props.setToken } />;
    } 
    else {

      content = < Signup setToken ={ this.props.setToken } />;

    }

    return (

        <div className ="Landing">

          <div className ="Landing-container">
            <button className ="Landing-btn" onClick = { this.toggleTrue } style = {{ borderBottom: this.state.hasAccount ? '2px solid black' : undefined }} > Log in </button>
            <button className ="Landing-btn" onClick = { this.toggleFalse } style = {{ borderBottom: !this.state.hasAccount ? '2px solid black' : undefined }} > Sign up </button>
          </div>

            
          { content }

        </div>

    )
    
  }
  
}

export default Landing;