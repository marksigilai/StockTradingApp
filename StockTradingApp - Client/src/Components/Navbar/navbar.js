import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './navbar.css'



class Navbar extends Component{

  constructor(){
    super()

    this.state = {
      toggle: false
    }
  }


       
  
  render() {

    console.log(window.location.pathname);

    return (
        <div className="Navbar">

          <Link className='Navbar-link' onClick={() => {this.setState({toggle: true})}} style = {{ borderBottom: window.location.pathname === '/' ? '2px solid black' : undefined }} to="/" >Home</Link>
          <Link className='Navbar-link' onClick={() => {this.setState({toggle: false})}} style = {{ borderBottom: window.location.pathname === '/account' ? '2px solid black' : undefined }} to="/account">Account</Link>

          <Link className='Navbar-link'  to="/" onClick = { this.props.logOut } > Logout </Link>

        </div>
    )
  }
}

export default Navbar;