import React, { Component } from 'react';
import Quote from '../../Components/Quote/quote.js'
import Portfolio from '../../Components/Portfolio/portfolio'
import transaction from '../../Helper/transaction.js';
import './homepage.css';

 


class Homepage extends Component {


    componentDidMount(){

      transaction.getUserInfo("userid").then((res) => {
        console.log(res)
      })

    }
  
  
    render() {
      return (
        <div className="Homepage">

          <Quote />

          <Portfolio /> 
            
        </div>
      );
    }

  }
  
  export default Homepage;