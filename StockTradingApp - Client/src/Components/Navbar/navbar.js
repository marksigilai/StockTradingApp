import React, { Component } from 'react';

import { Link } from "react-router-dom";



class Navbar extends Component{
       
  
  render() {
/*
    if(!this.props.authenticated){
      return (
        <div className="navbar">

          <Link to="/signup">Create an account</Link>
        
        </div>
      )
    }
*/
    return (
        <div className="navbar">

          <Link to="/">Home</Link>
          <Link to="/account">Account</Link>
          <Link to="/settings">Settings</Link>
 
          <Link to="/settings" onClick = { this.props.logOut } > Logout </Link>


        </div>
    )
  }
}

export default Navbar;