import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar/navbar';
import Homepage from './Routes/Homepage/homepage';
import Landing from './Routes/Landing/landing';
import Account from './Routes/Account/account'
import { Route, Routes } from 'react-router-dom';


import axios from 'axios';

class App extends Component {

  constructor(){
    super();

    this.state = {
      token:"",
      authenticated:false
    } 

    axios.get("express_backend").then( res => {
      console.log(res.data);
    })

  }

  componentDidMount(){

    this.getToken();

  }


  //get token from local storage
  getToken = () => {

    let token = localStorage.getItem('token')

    if(token){
      this.setState({
        authenticated: true,
        token: token,
      })
    }
    else{
      this.setState({
        authenticated: false
      })
    }

  }

  //save token to local storage
  saveToken = (token) => {
    localStorage.setItem('token', JSON.stringify(token));
  }


  //set the token and the userid for this session
  setUserInfo = (userid, token) =>{

    console.log("we are setting the token in app..")

    this.setState({
      userid: userid,
      token: token, 
      authenticated: true
    })

    this.saveToken(token)

  }

  logOut = () => {

    this.setState({
      userid: "",
      token: "", 
      authenticated: false
    })

    localStorage.removeItem("token")

  }

  
  render() {

    if(!this.state.authenticated){

        return (

            <Landing setUserInfo={ this.setUserInfo } />

        )
    }

    return (
      <div class = "app">
        
          <Navbar logOut = { this.logOut } />

          <Routes>

            <Route exact path="/" element={ <Homepage /> }/>  
            <Route exact path="/account" element={ <Account /> }/>  

          </Routes>
          
      </div>
    );

  }


}
  
  export default App;