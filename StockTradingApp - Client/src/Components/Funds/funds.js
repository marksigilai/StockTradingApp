import React, { Component } from 'react';

import AddFunds from '../AddFunds/addFunds';
import './funds.css'

class Funds extends Component {

    constructor(){
        super()

        console.log("Hello")

    }

    render() {
      return (
        <div className="Funds">
            <h2 className="Funds-header">Make a deposit</h2>

            <div className="Funds-balance">
                <h2 className="Funds-subheading">The balance is</h2>
                <h2>{this.props.Balance} </h2>  
            </div>
            
            <div className="Funds-withheld">
              
              <h2 className="Funds-subheading">Withheld funds</h2>
              <h2>{this.props.something} </h2>  

            </div>

            <AddFunds />

        </div>
      );
    }
  }
  
  export default Funds;