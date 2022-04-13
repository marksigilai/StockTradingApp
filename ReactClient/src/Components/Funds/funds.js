import React, { Component } from 'react';
import transaction from '../../Helper/transaction';
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
      transaction.getUserInfo(localStorage.getItem("userid")).then((response) => {

        console.log(response.data)
        if(response.data){
            if(response.data){
                this.setState({
                    balance: response.data.balance,
                })
            }
            
        }
        else if(response.error){
            this.setState({
                error: response.error
            })
        }
  
      })
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