import React, { Component } from 'react';

import Login from '../../Components/Login/login'
import Signup from '../../Components/Signup/signup'

import axios from 'axios';



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
      
    // fetching the GET route from the Express server which matches the GET route from server.js
    /*
    callBackendAPI = async () => {
        axios.get('index').then(res => {
            console.log("Hiiiii");
            if (res.status !== 200) {
                throw Error(res.message) 
            }
            return res;
        });

    };
  */
 
  render() {


    let content;

    if (this.state.hasAccount) {

      content = < Login setToken ={ this.props.setToken } />;
    } 
    else {

      content = < Signup setToken ={ this.props.setToken } />;

    }

    return (

        <div className ="landing">

          <div className=""> This is the landing page </div>

          <button onClick = { this.toggleTrue } > Log in </button>

          <button onClick = { this.toggleFalse } > Sign up </button>

          { content }

        </div>

    )
    
  }
  
}

export default Landing;