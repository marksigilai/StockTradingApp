import React, { Component } from 'react';

import AddFunds from '../AddFunds/addFunds';
import './funds.css'

class Funds extends Component {

    constructor(){
        super()
        this.state = {
          //balance: this.props.balance
          balance: "?",
          withheldfunds: "?"
        }
    }

    componentDidMount(){
      
    }

    updateBalance = (balance) => {
      this.setState({
        balance: balance
      })
    }

    render() {
      return (
        <div className="Funds">
            <h2 className="Funds-header">Make a deposit</h2>

            <div className="Funds-container">
                <h2 className="Funds-subheading">Your balance is</h2>
                <h2 className="Funds-balance">${this.state.balance}</h2>  
            </div>
          {/*             
            <div className="Funds-withheld">
              
              <h2 className="Funds-subheading">Withheld funds</h2>
              <h2>{this.state.withheldfunds} </h2>  

            </div> */}

            <AddFunds updateBalance={this.updateBalance}/>

        </div>
      );
    }
  }
  
  export default Funds;